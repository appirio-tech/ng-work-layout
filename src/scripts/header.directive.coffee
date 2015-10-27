'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/layout-header.directive.html'
  controller : 'LayoutHeaderController as vm'
  scope      :
    workId: '@workId'
    userType: '@userType'

angular.module('appirio-tech-ng-work-layout').directive 'layoutHeader', directive
