import {expect} from 'chai';
import 'mocha';
import cn from './classnames';

describe('classNames', function () {
  const tests = [
    ['strings', ['foo', 'bar'], 'foo bar'],
    ['truthy object', [{'foo-bar': true}], 'foo-bar'],
    ['falsy object', [{'foo-bar': false}], ''],
    ['string and truthy object', ['foo', {bar: true}], 'foo bar'],
    ['two objects', [{foo: true}, {bar: true}], 'foo bar'],
    ['object with two properties', [{foo: true, bar: true}], 'foo bar'],
    [
      'strings and objects',
      ['foo', {bar: true, duck: false}, 'baz', {quux: true}],
      'foo bar baz quux',
    ],
    [
      'primitives and object',
      [null, false, 'bar', undefined, 0, 1, {baz: null}, ''],
      'bar 1',
    ],
    ['arrays', ['bar', [1, null, 'baz'], {baz: true}, '3'], 'bar 1 baz baz 3'],
    [
      'nested arrays',
      [true, 'bar', [1, null, 'baz', ['foo', 'test']], {baz: true}, '3'],
      'bar 1 baz foo test baz 3',
    ],
  ];

  // eslint-disable-next-line mocha/no-setup-in-describe
  tests.forEach(([name, args, res]) => {
    it(`Should process ${name}`, function () {
      expect(cn(...args)).equal(res);
    });
  });
});
