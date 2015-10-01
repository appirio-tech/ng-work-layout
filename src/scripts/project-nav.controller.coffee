'use strict'

ProjectNavController = (
  $scope
  $state
  StepsAPIService
) ->
  vm          = this
  vm.workId = $scope.workId

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
  'StepsAPIService'
]

angular.module('appirio-tech-ng-work-layout').controller 'ProjectNavController', ProjectNavController
