import {expect} from 'chai';
import * as sinon from 'sinon';
import 'mocha';
import {Block} from './block';

describe('Block', function () {
  describe('init', function () {
    it('Should init props/state correctly', function () {
      class Component extends Block {
        init(): AnyObject {
          this.state = {
            test: 1,
          };

          return {test: 2};
        }
      }

      const c = new Component();

      // @ts-ignore
      expect(c.state.test).equal(1);
      // @ts-ignore
      expect(c.props.test).equal(2);
    });
  });

  describe('forceUpdate', function () {
    it('Should trigger rerender', function () {
      class Component extends Block {
        render(): string {
          return super.render();
        }
      }
      const c = new Component();
      const spy = sinon.spy(c, 'render');

      // @ts-ignore
      c.forceUpdate();

      expect(spy.calledOnce).true;
    });
  });

  describe('CDM', function () {
    it('Should be called on component init', function () {
      let count = 0;
      class Component extends Block {
        componentDidMount(): void {
          count++;
        }
      }

      new Component();

      expect(count).equal(1);
    });
  });

  describe('CDU', function () {
    it('Should be called on props update', function () {
      class Component extends Block {
        componentDidUpdate() {
          return true;
        }
      }
      const c = new Component();
      const spy = sinon.spy(c, 'componentDidUpdate');

      c.setProps({test: 1});

      expect(spy.calledOnce).true;
    });

    it('Should trigger rerender when return true', function () {
      class Component extends Block {
        componentDidUpdate() {
          return true;
        }
        render() {
          return super.render();
        }
      }
      const c = new Component();
      const spy = sinon.spy(c, 'render');

      c.setProps({test: 1});

      expect(spy.calledOnce).true;
    });

    it('Should not trigger rerender when return false', function () {
      class Component extends Block {
        componentDidUpdate() {
          return false;
        }
        render() {
          return super.render();
        }
      }
      const c = new Component();
      const spy = sinon.spy(c, 'render');

      c.setProps({test: 1});

      expect(spy.notCalled).true;
    });
  });

  describe('setProps', function () {
    it('Should change props', function () {
      class Component extends Block {
        render() {
          return super.render();
        }
      }
      const c = new Component({test: 1});

      c.setProps({test: 2});

      // @ts-ignore
      expect(c.props.test).equal(2);
    });
  });

  describe('setState', function () {
    it('Should change state', function () {
      class Component extends Block {
        init(): void {
          this.state = {test: 1};
        }
        render() {
          return super.render();
        }
      }
      const c = new Component();

      c.setState({test: 2});

      // @ts-ignore
      expect(c.state.test).equal(2);
    });
  });

  describe('render', function () {
    it('Should render correct template', function () {
      class Component extends Block {
        render() {
          return `<div>
            <span>${this.props.test}</span>
          </div>`;
        }
      }
      const c = new Component({test: 1});

      expect(c.element?.innerHTML).to.contain(`<span>1</span>`);
    });
  });
});
