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

    _compilePartial(partial, ctx, hasNestedPartials) {
        const [key, ...rest] = partial.split(/\s+/);
        const params = rest.reduce((acc, param) => {
            const [key, value] = param.split('=');
            acc[key] = value;
            return acc;
        }, {});
        const partialCtx = Object.assign(params, ctx);
        if (hasNestedPartials) {
            for (const [key, value] of Object.entries(params)) {
                params[key] = Templator.partials[value] ? Templator.partials[value].compile(partialCtx) : value;
            }
        }
        return Templator.partials[key].compile(partialCtx);
    }

    _compileTemplate(ctx) {
        let match;
        let tmpl = this._template;
        while ((match = this.TMPL_RE.exec(tmpl))) {
            if (!match[1]) {
                continue;
            }
            if (match[1].startsWith('#>')) {
                const partial = match[1].slice(2).trim();
                const partialCompiled = this._compilePartial(partial, ctx, true);
                tmpl = tmpl.replace(new RegExp(match[0], 'gi'), partialCompiled);
                continue;
            }
            if (match[1].startsWith('>')) {
                const partial = match[1].slice(1).trim();
                const partialCompiled = this._compilePartial(partial, ctx);
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
