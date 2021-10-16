const compilerOptions = require('./tsconfig.json').compilerOptions;

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
      require('global-jsdom')('', {
        url: 'https://domain.com/',
      });
    },
  };
};
