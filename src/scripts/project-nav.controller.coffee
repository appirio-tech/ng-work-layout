'use strict'

ProjectNavController = ($scope, $state) ->
  vm          = this
  vm.workId   = $scope.workId
  vm.threadId = "threadfor-#{vm.workId}"
  vm.userType = $scope.userType || 'customer'

  activateLink = ->
    stateName = $state.current.name
    isSubmission = stateName == 'submissions' || stateName == 'final-designs' || stateName == 'final-designs' || stateName == 'final-fixes'

    if isSubmission
      vm.activeLink = 'submissions'
    else
      vm.activeLink = stateName

  activate = ->
    activateLink()

    vm

  activate()

ProjectNavController.$inject = [
  '$scope'
  '$state'
]

angular.module('appirio-tech-ng-work-layout').controller 'ProjectNavController', ProjectNavController
