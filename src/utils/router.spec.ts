import {expect} from 'chai';
import {afterEach} from 'mocha';
import {Router} from './router';
import {Block} from './block';
import * as sinon from 'sinon';

const pageTemplate = '<div>Title</div>';

class Page extends Block {
  render() {
    return pageTemplate;
  }
}

function createPage(tmpl: string): typeof Block {
  return class extends Block {
    render() {
      return tmpl;
    }
  };
}

const rootQuery = 'body';
const router = new Router(rootQuery);

describe('Router', function () {
  afterEach(function () {
    router.routes = [];
    window.onpopstate = null;
    sinon.restore();
  });

  it('Should be singleton', function () {
    expect(new Router(rootQuery)).equal(router);
  });

  describe('Start', function () {
    it('Should start listening popstate event', function () {
      router.start();

      expect(window.onpopstate).to.be.instanceOf(Function);
    });

    it('Should render the correct route', function () {
      router.use(window.location.pathname, Page);
      router.start();

      expect(document.body.innerHTML).to.contain(pageTemplate);
    });
  });

  describe('Adding routes', function () {
    it('Should add route', function () {
      router.use('/', Page);
      router.use('/home', Page);

      expect(router.routes.length).eq(2);
    });
  });

  describe('Routing', function () {
    it('Should change history and content on go', function () {
      router.use('/', Page);
      router.use('/path1', createPage('<div>Page1</div>'));
      router.use('/path2', createPage('<div>Page2</div>'));
      router.go('/path1');
      router.go('/path2');

      expect(window.history.length).to.equal(3);
      expect(document.body.innerHTML).to.contain('Page2');
    });

    it('Should call history.back on back', function () {
      const spy = sinon.spy(window.history, 'back');

      router.back();

      expect(spy.calledOnce).true;
    });

    it('Should call history.forward on forward', function () {
      const spy = sinon.spy(window.history, 'forward');

      router.forward();

      expect(spy.calledOnce).true;
    });
  });
});
