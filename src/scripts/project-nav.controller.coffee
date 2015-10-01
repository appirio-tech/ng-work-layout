'use strict'

ProjectNavController = (
  $scope
  $state
  StepsAPIService
) ->
  vm          = this
  vm.workId = $scope.workId

  onStateChange = ->
    stateName = $state.current.name
    isSubmission = stateName == stateName == 'submissions' || 'design-concepts' || stateName == 'final-designs' || stateName == 'final-fixes'
    if isSubmission
      vm.activeLink = 'submissions'
    else
      vm.activeLink = stateName

  activate = ->
    $scope.$watch '$state.current', onStateChange

    vm

  activate()

ProjectNavController.$inject = [
  '$scope'
  '$state'
  'StepsAPIService'
]

angular.module('appirio-tech-ng-work-layout').controller 'ProjectNavController', ProjectNavController
