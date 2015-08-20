'use strict'

config = ($stateProvider) ->
  states = {}

  states['home'] =
    url        : '/'
    title      : 'home'
    templateUrl: 'views/home.html'
    controller : 'HomeController as vm'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


