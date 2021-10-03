import {expect} from 'chai';
import * as sinon from 'sinon';
import 'mocha';
import store from './store';

describe('Store', function () {
  it('Should listen to root state change', function () {
    const spy = sinon.spy();
    store.subscribe('', spy);

    store.state.user = {};
    store.state.user = {name: 'John Doe'};

    expect(spy.calledTwice).true;
  });

  it('Should listen to nested state change', function () {
    const spy = sinon.spy();
    store.subscribe('user.roles', spy);
    store.state.user = {name: 'John Doe', roles: {admin: true}};

    store.state.user.roles.admin = false;
    store.state.user.roles.admin = true;

    expect(spy.calledTwice).true;
  });

  it('Should subscribe using existing object property', function () {
    const spy = sinon.spy();
    store.state.user = {name: 'John Doe', roles: {admin: true}};
    store.subscribe(store.state.user.roles, spy);

    store.state.user.roles.admin = false;
    store.state.user.roles.admin = true;

    expect(spy.calledTwice).true;
  });
});
