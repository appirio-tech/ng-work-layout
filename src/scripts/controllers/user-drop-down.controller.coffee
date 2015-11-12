'use strict'

UserDropDownController = ($scope, UserV3Service) ->
  vm = this
  vm.handle = ''

  onUserChange = ->
    user = UserV3Service.getCurrentUser()

    vm.handle = user?.handle

  activate = ->
    $scope.$watch UserV3Service.getCurrentUser, onUserChange

    vm

  activate()

UserDropDownController.$inject = [
  '$scope'
  'UserV3Service'
]

angular.module('appirio-tech-ng-work-layout').controller 'UserDropDownController', UserDropDownController
