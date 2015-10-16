'use strict'

ProjectNavController = (
  $scope
  $state
  StepsAPIService
  SubmitWorkAPIService
) ->
  vm          = this
  vm.workId = $scope.workId
  vm.threadId = "threadfor-#{vm.workId}"

  activateLink = ->
    stateName = $state.current.name
    isSubmission = stateName == 'submissions' || stateName == 'final-designs' || stateName == 'final-designs' || stateName == 'final-fixes'
    if isSubmission
      vm.activeLink = 'submissions'
    else
      vm.activeLink = stateName

  getWorkItem = ->
    if vm.workId
      params =
        id: vm.workId

      resource = SubmitWorkAPIService.get params

      resource.$promise.then (response) ->
        vm.work = response

  activate = ->
    activateLink()
    getWorkItem()
    vm

  activate()

ProjectNavController.$inject = [
  '$scope'
  '$state'
  'StepsAPIService'
  'SubmitWorkAPIService'
]

angular.module('appirio-tech-ng-work-layout').controller 'ProjectNavController', ProjectNavController
