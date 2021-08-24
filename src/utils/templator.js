import get from './get';

export class Templator {
    TMPL_RE = /\{\{(.*?)\}\}/gi;

    constructor(template) {
        this._template = template;
    }

    compile(ctx) {
        return this._compileTemplate(ctx);
    }

    _compileTemplate(ctx) {
        let match;
        let tmpl = this._template;
        while ((match = this.TMPL_RE.exec(tmpl))) {
            if (match[1]) {
                const prop = match[1].trim();
                const data = get(ctx, prop);
                if (typeof data === 'function') {
                    window[prop] = data;
                    tmpl = tmpl.replace(new RegExp(match[0]), `window.${prop}()`);
                }
                tmpl = tmpl.replace(new RegExp(match[0], 'gi'), data);
            }
        }
        return tmpl;
    }
}
