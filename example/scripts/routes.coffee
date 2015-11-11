'use strict'

config = ($stateProvider) ->
  states = {}

  states['home'] =
    url        : '/'
    title      : 'customer'
    templateUrl: 'views/customer.example.html'

  states['customer'] =
    url        : '/customer'
    title      : 'customer'
    templateUrl: 'views/customer.example.html'

  states['copilot'] =
    url        : '/copilot'
    title      : 'copilot'
    templateUrl: 'views/copilot.example.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


