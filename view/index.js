'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');
var yeoman = require('yeoman-generator');

var ViewGenerator = ScriptBase.extend({
  constructor: function() {
    ScriptBase.apply(this, arguments);
  },

  createViewFile: function() {
    this.htmlTemplate(
      '../common/app/views/view.php',
      path.join(
        'views',
        this.name.toLowerCase() + '.php'
      )
    );
  }
});

module.exports = ViewGenerator;
