/*global describe, before, it, beforeEach */
'use strict';

var fs = require('fs');
var assert = require('assert');
var path = require('path');
var util = require('util');
var generators = require('yeoman-generator');
var helpers = require('yeoman-generator').test;

describe('Angular-RequireJS generator template mechanism', function () {
  var angular;
  var appName = 'upperCaseBug';

  beforeEach(function (done) {
    var deps = [
      '../../../app',
      '../../../common',
      '../../../controller',
      '../../../main', [
        helpers.createDummyGenerator(),
        'karma-require:app'
      ]
    ];
    helpers.testDirectory(path.join(__dirname, 'temp', appName), function (err) {
      if (err) {
        done(err);
      }
      angular = helpers.createGenerator('angular-require:app', deps, [appName], {
        'skip-welcome-message': true,
        'skip-install': true,
        'skip-message': true
      });
      done();
    });
  });

  it('should generate the same appName in every file', function (done) {
    var expected = [
      'app/scripts/app.js',
      'app/scripts/controllers/main.js',
      'app/index.html',
      'test/spec/controllers/mainSpec.js'
    ];

    helpers.mockPrompt(angular, {
      compass: true,
      bootstrap: true,
      compassBootstrap: true,
      modules: []
    });

    angular.run({}, function () {
      // Check if all files are created for the test
      helpers.assertFile(expected);

      // read JS Files
      var app_js = fs.readFileSync('app/scripts/app.js', 'utf8');
      var main_js = fs.readFileSync('app/scripts/controllers/main.js', 'utf8');
      var main_test_js = fs.readFileSync('test/spec/controllers/mainSpec.js', 'utf8');

      // Test JS Files
      var regex_js_app = new RegExp('module\\(\'' + appName + 'App\'');
      assert.ok(regex_js_app.test(app_js), 'app.js template using a wrong appName');
      var regex_js_controller = new RegExp('module\\(\'' + appName + 'App.controllers.MainCtrl\'');
      assert.ok(regex_js_controller.test(main_js), 'main.js template using a wrong appName');
      assert.ok(regex_js_controller.test(main_test_js), 'controller spec template using a wrong appName');

      // read HTML file
      var index_html = fs.readFileSync('app/index.html', 'utf8');

      // Test HTML File
      var regex_html = new RegExp('ng-app=\"' + appName + 'App\"');
      assert.ok(regex_html.test(index_html), 'index.html template using a wrong appName');
      done();
    });
  });
});
