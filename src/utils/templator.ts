import get from './get';

export class Templator {
  _template: string;

  static partials = {};

  static addPartial(key, tmpl) {
    Templator.partials[key] = tmpl;
  }

  TMPL_RE = /\{\{(.*?)\}\}/gi;

  constructor(template) {
    this._template = template;
  }

  _processPartial(tmpl, match, ctx) {
    const partial = match[1].slice(1).trim();
    const [key] = partial.split(/\s+/);
    const paramsRegex = /[^\s"]+=[^\s"]+|[^\s"]+="[^"]*"|[^\s"=]+/gi;
    let next;
    const params = {};
    const nested = {};
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
    const partialCtx = Object.assign({}, ctx, params);
    Object.entries(nested).forEach(([prop, value]: [string, any]) => {
      nested[prop] = Templator.partials[value]
        ? Templator.partials[value].compile(partialCtx)
        : value;
    });
    return tmpl.replace(
      new RegExp(match[0].replace('?', '\\?'), 'gi'),
      Templator.partials[key].compile(Object.assign(nested, partialCtx))
    );
  }

  _processConditional(tmpl, match, ctx) {
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

  _processProp(tmpl, match, ctx) {
    const prop = match[1].trim();
    const data = get(ctx, prop, '');
    if (typeof data === 'function') {
      window[prop] = data;
      return tmpl.replace(new RegExp(match[0], 'gi'), `window.${prop}(event)`);
    }
    return tmpl.replace(new RegExp(match[0], 'gi'), data);
  }

  _compileTemplate(ctx) {
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
        continue;
      }
      tmpl = this._processProp(tmpl, match, ctx);
      this.TMPL_RE.lastIndex = match.index;
    }
    return tmpl;
  }

  compile(ctx) {
    return this._compileTemplate(ctx);
  }

  render(ctx) {
    const compiled = this.compile(ctx);
    return new DOMParser().parseFromString(compiled, 'text/html').body
      .firstChild;
  }
}
