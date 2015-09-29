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

  states['design-concepts'] =
    url        : '/submissions/:workId/:stepId/design-concepts'
    title      : 'submissions'
    templateUrl: 'views/submissions.html'

  states['final-designs'] =
    url        : '/submissions/:workId/:stepId/final-designs'
    title      : 'submissions'
    templateUrl: 'views/submissions.html'

  states['final-fixes'] =
    url        : '/submissions/:workId/:stepId/final-fixes'
    title      : 'submissions'
    templateUrl: 'views/submissions.html'

  states['timeline'] =
    url        : '/timeline/:workId'
    title      : 'submissions'
    templateUrl: 'views/submissions.html'

  states['messaging'] =
    url        : '/messaging/:id'
    title      : 'submissions'
    templateUrl: 'views/submissions.html'

  for key, state of states
    $stateProvider.state key, state

config.$inject = ['$stateProvider']

angular.module('example').config(config).run()


