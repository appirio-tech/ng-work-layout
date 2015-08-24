'use strict'

directive = ->
  restrict   : 'E'
  templateUrl: 'views/layout-footer.directive.html'

angular.module('appirio-tech-ng-layout').directive 'layoutFooter', directive
