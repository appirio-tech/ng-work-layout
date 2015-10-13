'use strict'

LayoutHeaderController = (
  $scope
  $state
  UserV3Service
  WorkAPIService
  ThreadsAPIService
  AuthService
  SubmitWorkAPIService
  $rootScope
) ->
  vm              = this
  vm.homeHref     = $state.href 'home'
  vm.workId       = $scope.workId
  vm.isSubmitWork = false

  getNotificationCount = (id) ->
    queryParams =
      subscriberId: id

    resource = ThreadsAPIService.query queryParams

    resource.$promise.then (response) ->
      vm.unreadCount = response.totalUnreadCount

  vm.logout = ->
    AuthService.logout().then ->
      $state.go 'home'

  onUserChange = ->
    user = UserV3Service.getCurrentUser()

    if user?.id
      vm.loggedIn     = true
      vm.subscriberId = user.id
      vm.homeHref     = $state.href 'manage'
      vm.handle       = user.handle

      getNotificationCount user.id

      resource = WorkAPIService.get()

      resource.$promise.then (response) ->
        vm.projects = response
    else
      vm.projects  = []
      vm.homeHref = $state.href 'home'
      vm.loggedIn  = false

  onProjectChange = (response) ->
    if response.name
      vm.appName = response.name
    else
      vm.appName = ''

  setAppName = (stateName) ->
    hiddenAppNameStates =
      'view-work-multiple': true
      'view-projects.open': true
      'view-projects.assigned': true

    vm.showAppName = true unless hiddenAppNameStates[stateName]

  activate = ->
    params =
      id: vm.workId

    $scope.$watch UserV3Service.getCurrentUser, onUserChange

    setAppName $state.current.name

    if vm.workId
      SubmitWorkAPIService.get params, onProjectChange

  activate()

  vm

LayoutHeaderController.$inject = [
  '$scope'
  '$state'
  'UserV3Service'
  'WorkAPIService'
  'ThreadsAPIService'
  'AuthService'
  'SubmitWorkAPIService'
  '$rootScope'
]

angular.module('appirio-tech-ng-work-layout').controller 'LayoutHeaderController', LayoutHeaderController
