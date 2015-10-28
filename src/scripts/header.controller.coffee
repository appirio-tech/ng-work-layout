'use strict'

LayoutHeaderController = (
  $scope
  $state
  UserV3Service
  WorkAPIService
  ThreadsAPIService
  AuthService
  SubmitWorkAPIService
  InboxesProjectAPIService
  ProjectsAPIService
  $rootScope
) ->
  vm              = this
  vm.homeHref     = $state.href 'home'
  vm.workId       = $scope.workId
  vm.userType     = $scope.userType || 'customer'
  vm.isSubmitWork = false

  getNotificationCount = (id) ->
    resource = InboxesProjectAPIService.get()

    resource.$promise.then (response) ->
      vm.unreadCount = response.totalUnreadCount

  vm.logout = ->
    AuthService.logout().then ->
      $state.go 'login'

  onUserChange = ->
    user = UserV3Service.getCurrentUser()

    if user?.id
      vm.loggedIn     = true
      vm.subscriberId = user.id
      vm.handle       = user.handle
      vm.userAvatar   = user.avatar

      if vm.userType == 'customer'
        vm.homeHref = $state.href 'view-work-multiple'
      else
        vm.homeHref = $state.href 'copilot-projects'


      getNotificationCount user.id

      if vm.userType == 'customer'
        resource = WorkAPIService.get()

        resource.$promise.then (response) ->
          vm.projects = response
      else
        params =
          filter: "copilotId=#{user.id}"

        resource = ProjectsAPIService.query params

        resource.$promise.then (response) ->
          vm.copilotProjects = response
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
      'copilot-projects': true
      'copilot-open-projects': true

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
  'InboxesProjectAPIService'
  'ProjectsAPIService'
  '$rootScope'
]

angular.module('appirio-tech-ng-work-layout').controller 'LayoutHeaderController', LayoutHeaderController
