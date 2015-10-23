'use strict'

ProjectNavController = ($scope, $state) ->
  vm          = this
  vm.workId   = $scope.workId
  vm.threadId = "threadfor-#{vm.workId}"
  vm.userType = $scope.userType || 'customer'

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
]

angular.module('appirio-tech-ng-work-layout').controller 'ProjectNavController', ProjectNavController
