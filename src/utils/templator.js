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
        const [key] = partial.split(/\s+/);
        const params_re = /[^\s"]+=[^\s"]+|[^\s"]+="[^"]*"/gi;
        let match;
        const params = {};
        while ((match = params_re.exec(partial.slice(key.length).trim()))) {
            let [prop, value] = match[0].split('=');
            value = value.replace(/"/g, '');
            params[prop] = value;
        }
        const partialCtx = Object.assign({}, ctx, params);
        if (hasNestedPartials) {
            for (const [key, value] of Object.entries(partialCtx)) {
                partialCtx[key] = Templator.partials[value] ? Templator.partials[value].compile(partialCtx) : value;
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
            if (match[1].startsWith('#if')) {
                const paramString = match[1].slice(3).trim();
                let [key, value = true] = paramString.split(' ');
                let isNegation = false;
                if (key.startsWith('!')) {
                    isNegation = true;
                    key = key.slice(1);
                }
                const data = get(ctx, key, '');
                const re = new RegExp(`${match[0]}((?!\/if).*?){{\/if}}`, 'msi');
                const isVisible = isNegation && data !== value || !isNegation && data === value;
                tmpl = tmpl.replace(re, isVisible ? '$1' : '');
                this.TMPL_RE.lastIndex = match.index;
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
                tmpl = tmpl.replace(new RegExp(match[0].replace('?', '.'), 'gi'), partialCompiled);
                continue;
            }
            const prop = match[1].trim();
            const data = get(ctx, prop, '');
            if (typeof data === 'function') {
                window[prop] = data;
                tmpl = tmpl.replace(new RegExp(match[0], 'gi'), `window.${prop}()`);
                continue;
            }
            tmpl = tmpl.replace(new RegExp(match[0], 'gi'), data);
        }
        return tmpl;
    }
}
