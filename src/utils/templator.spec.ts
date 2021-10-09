import {expect} from 'chai';
import 'mocha';
import {Block} from './block';
import {Templator} from './templator';

describe('Templator', function () {
  describe('Process property', function () {
    it('Should take property value from context', function () {
      const tmpl = new Templator(`<div>{{prop}}</div>`);
      const ctx = {prop: 'test'};

      const compiled = tmpl.compile(ctx);

      expect(compiled).contain('<div>test</div>');
    });
  });

  describe('Process partial', function () {
    class Component extends Block {
      render(): string {
        return `<div>Test {{prop}}</div>`;
      }
    }

    before(function () {
      Templator.addPartial('some-partial', Component);
    });

    it('Should add partial', function () {
      expect(Templator.partials['some-partial']).to.equal(Component);
    });

    it('Should replace partial with stub', function () {
      const tmpl = new Templator(`<div>
        {{> some-partial}}
      </div>`);

      const compiled = tmpl.compile();
      const stubs = Block.components;

      expect(Object.keys(stubs).length).to.equal(1);
      expect(compiled).match(/<div>\s*<div data-id=".+">.*<\/div>\s*<\/div>/);
    });
  });

  describe('Process conditional', function () {
    describe('Boolean', function () {
      const tmpl = new Templator(`<div>
        {{#if prop}}
          <span>Test</span>
        {{/if}}
      </div>`);

      it('Should render content when condition is met', function () {
        const ctx = {prop: true};

        const compiled = tmpl.compile(ctx);

        expect(compiled).contain('<span>Test</span>');
      });

      it('Should not render content when condition is not met', function () {
        const ctx = {prop: false};

        const compiled = tmpl.compile(ctx);

        expect(compiled).not.contain('<span>Test</span>');
      });
    });

    describe('Boolean negation', function () {
      const tmpl = new Templator(`<div>
        {{#if !prop}}
          <span>Test</span>
        {{/if}}
      </div>`);

      it('Should render content when condition is met', function () {
        const ctx = {prop: false};

        const compiled = tmpl.compile(ctx);

        expect(compiled).contain('<span>Test</span>');
      });

      it('Should not render content when condition is not met', function () {
        const ctx = {prop: true};

        const compiled = tmpl.compile(ctx);

        expect(compiled).not.contain('<span>Test</span>');
      });
    });

    describe('String', function () {
      const tmpl = new Templator(`<div>
        {{#if prop abc}}
          <span>Test</span>
        {{/if}}
      </div>`);

      it('Should render content when condition is met', function () {
        const ctx = {prop: 'abc'};

        const compiled = tmpl.compile(ctx);

        expect(compiled).contain('<span>Test</span>');
      });

      it('Should not render content when condition is not met', function () {
        const ctx = {prop: 'def'};

        const compiled = tmpl.compile(ctx);

        expect(compiled).not.contain('<span>Test</span>');
      });
    });

    describe('String negation', function () {
      const tmpl = new Templator(`<div>
        {{#if !prop abc}}
          <span>Test</span>
        {{/if}}
      </div>`);

      it('Should render content when condition is met', function () {
        const ctx = {prop: 'def'};

        const compiled = tmpl.compile(ctx);

        expect(compiled).contain('<span>Test</span>');
      });

      it('Should not render content when condition is not met', function () {
        const ctx = {prop: 'abc'};

        const compiled = tmpl.compile(ctx);

        expect(compiled).not.contain('<span>Test</span>');
      });
    });
  });

  describe('Process list', function () {
    const tmpl = new Templator(`<div>
        {{#each items}}
          name - {{#this.name}}
          value - {{#this.value}}
        {{/each}}
      </div>`);

    it('Should render every item', function () {
      const ctx = {
        items: [
          {name: 'a', value: 'b'},
          {name: 'c', value: 'd'},
        ],
      };

      const compiled = tmpl.compile(ctx);

      expect(compiled)
        .contain('name - a')
        .and.contain('value - b')
        .and.contain('name - c')
        .and.contain('value - d');
    });
  });
});
