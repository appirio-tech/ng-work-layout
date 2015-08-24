'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/layout-main.directive.html'
  controller : 'LayoutMainController as vm'

angular.module('appirio-tech-ng-work-layout').directive 'layoutMain', directive
