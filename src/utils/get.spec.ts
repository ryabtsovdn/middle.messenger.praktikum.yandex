import {expect} from 'chai';
import 'mocha';
import get from './get';

describe('Get', function () {
  it('Should return correct value when the path is valid', function () {
    const obj = {b: {a: 2}};

    const value = get(obj, 'b.a');

    expect(value).to.equal(2);
  });

  it('Should return default value when it is set and the path is invalid', function () {
    const obj = {b: {a: 2}};

    const value = get(obj, 'a.b', 0);

    expect(value).to.equal(0);
  });

  it('Should return null when no default and the path is invalid', function () {
    const obj = {b: {a: 2}};

    const value = get(obj, 'a.b');

    expect(value).to.equal(null);
  });
});
