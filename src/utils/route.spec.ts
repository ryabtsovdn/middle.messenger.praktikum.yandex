import {expect} from 'chai';
import * as sinon from 'sinon';
import 'mocha';
import {Route} from './route';
import {Block} from './block';

const pageTemplate = '<div>Test</div>';

class Page extends Block {
  render() {
    return pageTemplate;
  }
}

const defaultProps = {rootQuery: 'body'};

describe('Route', function () {
  describe('Matching', function () {
    it('Should match the correct pathname', function () {
      const route = new Route('/path', Page, defaultProps);

      expect(route.match('/path')).true;
    });

    it('Should not match the invalid pathname', function () {
      const route = new Route('/path', Page, defaultProps);

      expect(route.match('/wrong/path')).false;
    });
  });

  describe('Render', function () {
    it('Should create block with correct props', function () {
      const namespace = {Page};
      const spy = sinon.spy(namespace, 'Page');
      const route = new Route('/', namespace.Page, {
        ...defaultProps,
        text: 'Some text',
      });

      route.render();

      expect(spy.calledOnce).true;
      expect(spy.calledWith({text: 'Some text'})).true;
    });

    it('Should throw error when the root query is invalid', function () {
      const route = new Route('/', Page, {rootQuery: '#id'});

      expect(() => route.render()).to.throw(Error);
    });
  });

  describe('Leave', function () {
    it('Should hide the rendered block', function () {
      const namespace = {Page};
      const divSpy = sinon.spy(namespace, 'Page');
      const route = new Route('/', namespace.Page, defaultProps);
      route.render();
      const hideSpy = sinon.spy(divSpy.lastCall.returnValue, 'destroy');

      route.leave();

      expect(hideSpy.calledOnce).true;
    });
  });
});
