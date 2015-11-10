'use strict'

config = ($stateProvider) ->
  states = {}

  states['customer'] =
    url        : '/customer'
    title      : 'customer'
    templateUrl: 'views/customer.html'

  states['copilot'] =
    url        : '/copilot'
    title      : 'copilot'
    templateUrl: 'views/copilot.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


