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

  _processParams(
    paramsStr: string,
    ctx: UnknownObject
  ): {nested: AnyObject; params: AnyObject} {
    const paramsRegex = /[^\s"]+=[^\s"]+|[^\s"]+="[^"]*"|[^\s"=]+/gi;

    let next;
    const params: AnyObject = {};
    const nested: AnyObject = {};
    while ((next = paramsRegex.exec(paramsStr))) {
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

    return {nested, params};
  }

  _processPartial(
    tmpl: string,
    match: RegExpExecArray,
    ctx: UnknownObject
  ): string {
    const partialStr = match[1].slice(1).trim();
    const [key] = partialStr.split(/\s+/);
    const {nested, params} = this._processParams(
      partialStr.slice(key.length).trim(),
      ctx
    );

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
    let [key, value] = paramString.split(' ') as [string, string | boolean];

    const isNegation = key.startsWith('!');
    if (isNegation) {
      key = key.slice(1);
    }

    let data = get(ctx, key, '');
    if (value === undefined) {
      value = true;
      data = ![null, false, undefined, ''].some(v => v === data);
    }

    const ifRegex = new RegExp(`${match[0]}((?!/if).*?){{/if}}`, 'msi');
    const isVisible =
      (isNegation && data !== value) || (!isNegation && data === value);
    const ifMatch = tmpl.match(ifRegex);

    return tmpl.replace(ifRegex, isVisible && ifMatch ? ifMatch[1] : '');
  }

  _processProp(
    tmpl: string,
    match: RegExpExecArray,
    ctx: UnknownObject
  ): string {
    let prop = match[1].trim();
    if (prop.startsWith('.')) {
      prop = prop.slice(1);
    }

    let data = get(ctx, prop, '');

    if (data instanceof Block) {
      data = this._createStub(data);
    }

    return tmpl.replace(new RegExp(match[0], 'gi'), data);
  }

  _processList(
    tmpl: string,
    match: RegExpExecArray,
    ctx: UnknownObject
  ): string {
    const key = match[1].slice(5).trim();

    const list = get(ctx, key, '');
    const eachRegex = new RegExp(`${match[0]}((?!/if).*?){{/each}}`, 'msi');
    const eachMatch = tmpl.match(eachRegex) || [];
    const inner = (eachMatch[1] || '').trim();

    let listTmpl = '';
    for (let index = 0; index < list.length; index++) {
      listTmpl += inner
        .replace(/#this/g, `.${key}.${index}`)
        .replace(/#index/g, `${index}`);
    }

    return tmpl.replace(eachRegex, listTmpl);
  }

  _compileTemplate(ctx: UnknownObject): string {
    let match;
    let tmpl = this._template;
    while ((match = this.TMPL_RE.exec(tmpl))) {
      if (!match[1]) {
        continue;
      }

      if (match[1].startsWith('#each')) {
        tmpl = this._processList(tmpl, match, ctx);
        this.TMPL_RE.lastIndex = match.index;
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

  compile(ctx: UnknownObject = {}): string {
    const compiled = this._compileTemplate(ctx);
    return compiled;
  }
}
