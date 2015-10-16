'use strict'

directive =  ($location, $rootScope) ->
  link = ($scope, element, attrs) ->
    setPageClass = (e, data) ->
      if $location.$$url == '/'
        $(element[0]).addClass 'home'
      else
        classes = $location.$$path.replace /\//g, ' '

        $(element[0]).addClass classes

    $rootScope.$on '$locationChangeStart', setPageClass

    setPageClass()

  restrict : 'A'
  link: link

directive.$inject = ['$location', '$rootScope']

angular.module('appirio-tech-ng-work-layout').directive 'layoutMain', directive

