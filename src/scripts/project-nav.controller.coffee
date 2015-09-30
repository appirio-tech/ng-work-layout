'use strict'

ProjectNavController = (
  $scope
  $state
  StepsAPIService
) ->
  vm          = this
  vm.workId = $scope.workId
  vm.stepId = null
  vm.stepType = null
  vm.stepHref = '#'

  formatStepType = (stepType)->
    formatted =
      designConcepts: 'design-concepts'
      completeDesigns: 'complete-designs'
      finalFixes: 'final-fixes'

    formatted[stepType]

  onStepsChange = (resource) ->
    resource.$promise.then (response) ->
      response.forEach (step) ->
        if (step.stepType == 'designConcepts')
          vm.stepId = step.id
          vm.stepType = formatStepType step.stepType
          vm.stepHref = $state.href vm.stepType, {projectId: vm.workId, stepId: vm.stepId}

  onStateChange = ->
    stateName = $state.current.name
    isSubmission = stateName == 'design-concepts' || stateName == 'final-designs' || stateName == 'final-fixes'
    if isSubmission
      vm.activeLink = 'submissions'
    else
      vm.activeLink = stateName

  activate = ->
    params =
      projectId: vm.workId

    StepsAPIService.query params, onStepsChange

    $scope.$watch '$state.current', onStateChange


    vm

  activate()

ProjectNavController.$inject = [
  '$scope'
  '$state'
  'StepsAPIService'
]

angular.module('appirio-tech-ng-work-layout').controller 'ProjectNavController', ProjectNavController
