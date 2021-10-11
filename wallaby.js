// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const compilerOptions = require('./tsconfig.json').compilerOptions;

// eslint-disable-next-line no-undef
module.exports = function (wallaby) {
  return {
    trace: true,
    files: [
      {pattern: 'src/**/*.ts'},
      {pattern: 'src/**/*.spec.ts', ignore: true},
    ],
    tests: ['src/**/*.spec.ts'],
    env: {
      type: 'node',
      runner: 'node',
    },
    testFramework: 'mocha',
    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions),
    },
    setup: function () {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
      require('global-jsdom')('', {
        url: 'https://domain.com/',
      });
    },
  };
};
