'use strict';

/* Services */
angular.module('pequod.services', ['ngResource'])
  .factory('GistFactory', function($resource) {
    return $resource('/api/profile', {}, {
        query: {method: 'GET' },
        update: {method: 'POST' }
    });
  })