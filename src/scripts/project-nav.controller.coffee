'use strict'

ProjectNavController = (
  $scope
  $state
  StepsAPIService
) ->
  vm          = this
  vm.workId = $scope.workId

  activateLink = ->
    stateName         = $state.current.name
    submissionsStates = [ 'submissions', 'design-concepts', 'complete-designs', 'final-fixes', 'submission-detail', 'file-detail' ]

    if submissionsStates.indexOf(stateName) > -1
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
