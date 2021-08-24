import get from './get';

export class Templator {
    static partials = {};

    static addPartial(key, tmpl) {
        Templator.partials[key] = tmpl;
    }

    TMPL_RE = /\{\{(.*?)\}\}/gi;

    constructor(template) {
        this._template = template;
    }

    compile(ctx) {
        return this._compileTemplate(ctx);
    }

    render(ctx) {
        const compiled = this.compile(ctx);
        return new DOMParser().parseFromString(compiled, 'text/html').body.firstChild;
    }

    _compileTemplate(ctx) {
        let match;
        let tmpl = this._template;
        while ((match = this.TMPL_RE.exec(tmpl))) {
            if (!match[1]) {
                continue;
            }
            if (match[1].startsWith('>')) {
                const partial = match[1].slice(1).trim();
                const [key, ...rest] = partial.split(/\s+/);
                const params = rest.reduce((acc, param) => {
                    const [key, value] = param.split('=');
                    acc[key] = value;
                    return acc;
                }, {});
                const partialCompiled = Templator.partials[key].compile(params);
                tmpl = tmpl.replace(new RegExp(match[0], 'gi'), partialCompiled);
                continue;
            }
            const prop = match[1].trim();
            const data = get(ctx, prop, '');
            if (typeof data === 'function') {
                window[prop] = data;
                tmpl = tmpl.replace(new RegExp(match[0]), `window.${prop}()`);
                continue;
            }
            tmpl = tmpl.replace(new RegExp(match[0], 'gi'), data);
        }
        return tmpl;
    }
}
