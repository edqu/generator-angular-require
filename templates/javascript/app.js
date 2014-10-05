/*jshint unused: vars */
define(['angular']/*deps*/, function (angular)/*invoke*/ {
  'use strict';

  /**
   * @ngdoc overview
   * @name <%= scriptAppName %>
   * @description
   * # <%= scriptAppName %>
   *
   * Main module of the application.
   */
  return angular
    .module('<%= scriptAppName %>', [/*angJSDeps*/<%= angularModules %>])<% if (ngRoute) { %>
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    })<% } %>;
});
