'use strict'

#TODO: get rid of this directive

dir = ->
  restrict: 'E'
  templateUrl: 'views/layout-project-nav.directive.html'
  scope:
    workId : '@workId'

dir.$inject = []

angular.module('appirio-tech-ng-work-layout').directive 'layoutProjectNav', dir
