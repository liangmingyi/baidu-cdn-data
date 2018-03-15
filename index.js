'use strict';

var data = module.exports = require('./data');

// jQuery UI
data['jquery-ui'] = data['jqueryui'];

// AngularJS
var angular = data['angular.js'];
var angularFiles = [
  'angular',
  'angular-animate',
  'angular-cookies',
  'angular-loader',
  'angular-resource',
  'angular-route',
  'angular-sanitize',
  'angular-touch'
];

angularFiles.forEach(function (item) {
  data[item] = {
    versions: angular['versions'],
    url: function (version) {
      return angular.url(version).replace('angular.min.js', item + '.min.js');
    }
  };
});