'use strict'

LayoutMainController = ($location, $rootScope) ->
  vm = this

  setPageClass = (e, data) ->
    if $location.$$url == '/'
      vm.pageClass = 'getting-started';
    else
      vm.pageClass = $location.$$path.replace /\//g, ' '

  activate = ->
    $rootScope.$on '$locationChangeStart', setPageClass

    vm

  activate()

LayoutMainController.$inject = ['$location', '$rootScope']

angular.module('appirio-tech-ng-layout').controller 'LayoutMainController', LayoutMainController
