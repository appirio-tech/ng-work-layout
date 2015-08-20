'use strict'

HomeController = ->
  vm = this

  activate = ->
    vm.name = 'Robin'

    vm

  activate()

angular.module('appirio-tech-ng-layout').controller 'HomeController', HomeController
