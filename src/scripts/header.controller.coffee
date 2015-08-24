'use strict'

LayoutHeaderController = (
  $scope
  $state
  UserV3Service
  WorkAPIService
  ThreadsAPIService
  AuthService
) ->
  vm          = this
  vm.homeHref = $state.href 'home'

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

  activate = ->
    $scope.$watch UserV3Service.getCurrentUser, onUserChange

    vm

  activate()

LayoutHeaderController.$inject = [
  '$scope'
  '$state'
  'UserV3Service'
  'WorkAPIService'
  'ThreadsAPIService'
  'AuthService'
]

angular.module('appirio-tech-ng-layout').controller 'LayoutHeaderController', LayoutHeaderController
