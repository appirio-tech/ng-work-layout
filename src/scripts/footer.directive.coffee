'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/layout-footer.directive.html'

angular.module('appirio-tech-ng-work-layout').directive 'layoutFooter', directive
