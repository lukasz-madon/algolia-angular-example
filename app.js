'use strict';

angular.module('myApp', [
  'ngRoute',
  'ngSanitize'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', { templateUrl: 'template.html', controller: 'HomeCtrl' });
}])
.factory('Contacts', function() {
  return new AlgoliaSearch('latency', '6be0576ff61c053d5f9a3225e2a90f76').initIndex('contacts');
})
.controller('HomeCtrl', function ($scope, Contacts) {
    $scope.hits = [];
    $scope.query = '';
    $scope.initRun = true;
    $scope.search = function() {
      Contacts.search($scope.query, function(success, content) {
        if (!success || $scope.query != content.query) {
          return;
        }
        $scope.hits = content.hits;
        if ($scope.initRun){
          $scope.$apply();
          $scope.initRun = false;
        }
      });
    };
    $scope.search();
});
