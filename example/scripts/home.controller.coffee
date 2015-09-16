'use strict'

HomeController = ->
  vm = this

  activate = ->
    vm.name = 'Robin'
    vm.appName = 'Big Boss App'

    vm

  activate()

angular.module('appirio-tech-ng-work-layout').controller 'HomeController', HomeController
