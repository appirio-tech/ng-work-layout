'use strict'

config = ($stateProvider) ->
  states = {}

  states['home'] =
    url        : '/'
    title      : 'home'
    templateUrl: 'views/home.html'
    controller : 'HomeController as vm'

  states['manage'] =
    url        : '/manage'
    title      : 'manage'
    templateUrl: 'views/manage.html'

  states['submissions'] =
    url        : '/submissions'
    title      : 'submissions'
    templateUrl: 'views/submissions.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


