'use strict'

LayoutHeaderController = (
  $scope
  $state
  UserV3Service
  WorkAPIService
  ThreadsAPIService
  AuthService
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

  onProjectChange = (newVal) ->
    vm.appName = newVal || ''

  setState = (stateName) ->
    if stateName == 'submit-work' || stateName == 'submit-work-features' || stateName == 'submit-work-visuals' || stateName == 'submit-work-development'
      vm.isSubmitWork = true

  activate = ->
    $scope.$watch UserV3Service.getCurrentUser, onUserChange
    $rootScope.$watch 'currentAppName', onProjectChange
    setState $state.current.name

  activate()

  vm

LayoutHeaderController.$inject = [
  '$scope'
  '$state'
  'UserV3Service'
  'WorkAPIService'
  'ThreadsAPIService'
  'AuthService'
  '$rootScope'
]

angular.module('appirio-tech-ng-work-layout').controller 'LayoutHeaderController', LayoutHeaderController
