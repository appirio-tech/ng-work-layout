'use strict'

ProjectNavController = ($scope, $state, StepsService, $rootScope) ->
  vm             = this
  vm.workId      = $scope.workId
  vm.currentStepId = null
  vm.threadId    = "threadfor-#{vm.workId}"
  vm.userType    = $scope.userType || 'customer'
  vm.currentStep = null

  onChange = ->
    currentStep = if vm.stepId
      StepsService.getStepById vm.workId, vm.stepId
    else
      StepsService.getCurrentStep vm.workId

    if currentStep
      vm.currentStepId = currentStep.id

    stateName         = $state.current.name
    submissionsStates = [
      'step'
      'submission-detail'
      'file-detail'
    ]

    isSubmissionState = submissionsStates.indexOf(stateName) > -1
    vm.activeLink     = stateName
    vm.activeLink     = 'submissions' if isSubmissionState

  activate = ->
    destroyStepsListener = $rootScope.$on 'StepsService:changed', ->
      onChange()

    $scope.$on '$destroy', ->
      destroyStepsListener()

    onChange()

  activate()

  vm

ProjectNavController.$inject = [
  '$scope'
  '$state'
  'StepsService'
  '$rootScope'
]

angular.module('appirio-tech-ng-work-layout').controller 'ProjectNavController', ProjectNavController
