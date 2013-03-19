basePath = '../';

files = [
  MOCHA,
  MOCHA_ADAPTER,
  './config/mocha.conf.js',

  //3rd Party Code
  './app/lib/angular/angular.js',
  './app/lib/angular/angular-*.js',

  //App-specific Code
  './app/js/**/*.js',

  //Test-Specific Code
  '/usr/lib/node_modules/chai/chai.js',
  './test/lib/chai-should.js',
  './test/lib/chai-expect.js',
  './test/lib/angular/angular-mocks.js',

  //Test-Specs
  './test/unit/**/*.js'
];

port = 9201;
runnerPort = 9301;
captureTimeout = 5000;
growl     = true;
colors    = true;
singleRun = false;
autoWatch = true;
browsers  = ['Firefox'];
reporters = ['progress']
