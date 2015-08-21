'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/layout-header.directive.html'
  controller : 'LayoutHeaderController as vm'

angular.module('appirio-tech-ng-layout').directive 'layoutHeader', directive
