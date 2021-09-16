import get from './get';
import {Block} from './block';

export class Templator {
  _template: string;

  static partials: Record<string, typeof Block> = {};

  static addPartial(key: string, block: typeof Block): void {
    Templator.partials[key] = block;
  }

  TMPL_RE = /\{\{(.*?)\}\}/gi;

  constructor(template: string) {
    this._template = template;
  }

  _createStub(block: Block): string {
    Block.components[block.id] = block;
    return `<div data-id="${block.id}"></div>`;
  }

  _processPartial(
    tmpl: string,
    match: RegExpExecArray,
    ctx: UnknownObject
  ): string {
    const partial = match[1].slice(1).trim();
    const [key] = partial.split(/\s+/);
    const paramsRegex = /[^\s"]+=[^\s"]+|[^\s"]+="[^"]*"|[^\s"=]+/gi;
    let next;
    const params: AnyObject = {};
    const nested: AnyObject = {};
    while ((next = paramsRegex.exec(partial.slice(key.length).trim()))) {
      let [prop, value = true] = next[0].split('=');
      if (typeof value === 'string') {
        value = value.replace(/"/g, '');
        if (value.startsWith('.')) {
          value = get(ctx, value.slice(1), '');
        }
      }
      if (prop.startsWith('&')) {
        nested[prop.slice(1)] = value;
      } else {
        params[prop] = value;
      }
    }
    Object.entries(nested).forEach(([prop, value]) => {
      if (Templator.partials[value]) {
        const block = new Templator.partials[value](
          params[`.${prop}`] || params
        );
        nested[prop] = this._createStub(block);
      } else {
        nested[prop] = value;
      }
    });
    const partialCtx = Object.assign(nested, params);
    const partialBlock = new Templator.partials[key](partialCtx);
    return tmpl.replace(
      new RegExp(match[0].replace('?', '\\?'), 'gi'),
      this._createStub(partialBlock)
    );
  }

  _processConditional(
    tmpl: string,
    match: RegExpExecArray,
    ctx: UnknownObject
  ): string {
    const paramString = match[1].slice(3).trim();
    let [key, value = true] = paramString.split(' ');
    let isNegation = false;
    if (key.startsWith('!')) {
      isNegation = true;
      key = key.slice(1);
    }
    const data = get(ctx, key, '');
    const ifRegex = new RegExp(`${match[0]}((?!/if).*?){{/if}}`, 'msi');
    const isVisible =
      (isNegation && data !== value) || (!isNegation && data === value);
    return tmpl.replace(ifRegex, isVisible ? '$1' : '');
  }

  _processProp(
    tmpl: string,
    match: RegExpExecArray,
    ctx: UnknownObject
  ): string {
    const prop = match[1].trim();
    const data = get(ctx, prop, '');
    return tmpl.replace(new RegExp(match[0], 'gi'), data);
  }

  _compileTemplate(ctx: UnknownObject): string {
    let match;
    let tmpl = this._template;
    while ((match = this.TMPL_RE.exec(tmpl))) {
      if (!match[1]) {
        continue;
      }
      if (match[1].startsWith('#if')) {
        tmpl = this._processConditional(tmpl, match, ctx);
        this.TMPL_RE.lastIndex = match.index;
        continue;
      }
      if (match[1].startsWith('>')) {
        tmpl = this._processPartial(tmpl, match, ctx);
        this.TMPL_RE.lastIndex = match.index;
        continue;
      }
      tmpl = this._processProp(tmpl, match, ctx);
      this.TMPL_RE.lastIndex = match.index;
    }
    return tmpl;
  }

  compile(ctx: UnknownObject): string {
    return this._compileTemplate(ctx);
  }

  render(ctx: UnknownObject): Element {
    const compiled = this.compile(ctx);
    return new DOMParser().parseFromString(compiled, 'text/html').body
      .firstElementChild;
  }
}
