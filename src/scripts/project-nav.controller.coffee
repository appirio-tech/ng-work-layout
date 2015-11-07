'use strict'

ProjectNavController = ($scope, $state, StepsService, ProjectsAPIService, $rootScope) ->
  vm               = this
  vm.workId        = $scope.workId
  vm.currentStepId = null
  vm.threadId      = null
  vm.userType      = $scope.userType || 'customer'
  vm.currentStep   = null

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
    if vm.workId
      params =
        id: vm.workId

      resource = ProjectsAPIService.get params

      resource.$promise.then (response) ->
        vm.threadId = response.threadId

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
  'ProjectsAPIService'
  '$rootScope'
]

angular.module('appirio-tech-ng-work-layout').controller 'ProjectNavController', ProjectNavController
