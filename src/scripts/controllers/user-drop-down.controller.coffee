'use strict'

UserDropDownController = ($scope, UserV3Service, AuthService) ->
  vm = this
  vm.handle = ''

  onUserChange = ->
    user = UserV3Service.getCurrentUser()

    vm.handle = user?.handle

  vm.logout = ->
    AuthService.logout().then ->
      $state.go 'login'

  activate = ->
    $scope.$watch UserV3Service.getCurrentUser, onUserChange

    vm

  activate()

UserDropDownController.$inject = [
  '$scope'
  'UserV3Service'
  'AuthService'
]

angular.module('appirio-tech-ng-work-layout').controller 'UserDropDownController', UserDropDownController
