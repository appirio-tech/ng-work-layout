'use strict'

dir = ->
  restrict   : 'E'
  templateUrl: 'views/user-drop-down.directive.html'
  scope      : true

dir.$inject = []

angular.module('appirio-tech-ng-work-layout').directive 'userDropDown', dir
