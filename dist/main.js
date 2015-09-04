(function() {
  'use strict';
  var dependencies;

  dependencies = ['appirio-tech-ng-auth', 'appirio-tech-ng-api-services', 'appirio-tech-messaging', 'appirio-tech-ng-ui-components', 'duScroll'];

  angular.module('appirio-tech-ng-work-layout', dependencies);

}).call(this);

(function() {
  'use strict';
  var LayoutMainController;

  LayoutMainController = function($location, $rootScope) {
    var activate, setPageClass, vm;
    vm = this;
    setPageClass = function(e, data) {
      if ($location.$$url === '/') {
        return vm.pageClass = 'getting-started';
      } else {
        return vm.pageClass = $location.$$path.replace(/\//g, ' ');
      }
    };
    activate = function() {
      $rootScope.$on('$locationChangeStart', setPageClass);
      return vm;
    };
    return activate();
  };

  LayoutMainController.$inject = ['$location', '$rootScope'];

  angular.module('appirio-tech-ng-work-layout').controller('LayoutMainController', LayoutMainController);

}).call(this);

(function() {
  'use strict';
  var LayoutHeaderController;

  LayoutHeaderController = function($scope, $state, UserV3Service, WorkAPIService, ThreadsAPIService, AuthService) {
    var activate, getNotificationCount, onUserChange, vm;
    vm = this;
    vm.homeHref = $state.href('home');
    getNotificationCount = function(id) {
      var queryParams, resource;
      queryParams = {
        subscriberId: id
      };
      resource = ThreadsAPIService.query(queryParams);
      return resource.$promise.then(function(response) {
        return vm.unreadCount = response.totalUnreadCount;
      });
    };
    vm.logout = function() {
      return AuthService.logout().then(function() {
        return $state.go('home');
      });
    };
    onUserChange = function() {
      var resource, user;
      user = UserV3Service.getCurrentUser();
      if (user != null ? user.id : void 0) {
        vm.loggedIn = true;
        vm.subscriberId = user.id;
        vm.homeHref = $state.href('manage');
        vm.handle = user.handle;
        getNotificationCount(user.id);
        resource = WorkAPIService.get();
        return resource.$promise.then(function(response) {
          return vm.projects = response;
        });
      } else {
        vm.projects = [];
        vm.homeHref = $state.href('home');
        return vm.loggedIn = false;
      }
    };
    activate = function() {
      $scope.$watch(UserV3Service.getCurrentUser, onUserChange);
      return vm;
    };
    return activate();
  };

  LayoutHeaderController.$inject = ['$scope', '$state', 'UserV3Service', 'WorkAPIService', 'ThreadsAPIService', 'AuthService'];

  angular.module('appirio-tech-ng-work-layout').controller('LayoutHeaderController', LayoutHeaderController);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/layout-main.directive.html',
      controller: 'LayoutMainController as vm'
    };
  };

  angular.module('appirio-tech-ng-work-layout').directive('layoutMain', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/layout-header.directive.html',
      controller: 'LayoutHeaderController as vm',
      scope: true
    };
  };

  angular.module('appirio-tech-ng-work-layout').directive('layoutHeader', directive);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/layout-footer.directive.html',
      scope: true
    };
  };

  angular.module('appirio-tech-ng-work-layout').directive('layoutFooter', directive);

}).call(this);

(function() {
  'use strict';
  var dir,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  dir = function($state, $rootScope) {
    return {
      link: function(scope, element, attrs) {
        $rootScope.$on('$stateChangeSuccess', function() {
          var ref, ref1, ref2, states;
          states = ['timeline', 'messaging', 'submissions', 'submission-slides', 'submission-detail'];
          if (ref = $state.current.name, indexOf.call(states, ref) >= 0) {
            scope.show = true;
          } else {
            scope.show = false;
          }
          return scope.workId = ((ref1 = $state.params) != null ? ref1.workId : void 0) || ((ref2 = $state.params) != null ? ref2.id : void 0);
        });
        return scope.show = false;
      },
      restrict: 'E',
      templateUrl: 'views/layout-project-nav.directive.html'
    };
  };

  dir.$inject = ['$state', '$rootScope'];

  angular.module('appirio-tech-ng-work-layout').directive('layoutProjectNav', dir);

}).call(this);

angular.module("appirio-tech-ng-work-layout").run(["$templateCache", function($templateCache) {$templateCache.put("views/layout-main.directive.html","<layout-project-nav></layout-project-nav><main role=\"main\" ui-view=\"\" class=\"layout-main {{ vm.pageClass }}\"></main>");
$templateCache.put("views/layout-header.directive.html","<a ng-home-link=\"ng-home-link\" href=\"{{ vm.homeHref }}\" class=\"clean logo\">ASP</a><div class=\"secondary\"><ul class=\"nav\"><li><a ui-sref=\"submissions({workId: 123, phase: \'complete-designs\'})\">Submissions</a></li><li><a ui-sref=\"view-work-multiple\">Dashboard</a></li><li><a ui-sref=\"view-projects.assigned\">Copilot</a></li><li><a href=\"\">Projects</a><ul><li><a ui-sref=\"submit-work.flow\">Create New Project</a></li><li ng-repeat=\"project in vm.projects\"><a ui-sref=\"timeline({ workId: project.id })\">{{ project.name }}</a></li></ul></li></ul><a ui-sref=\"login\" ng-hide=\"vm.loggedIn\">Log in</a><a ui-sref=\"view-work-multiple\" ng-show=\"vm.loggedIn\" class=\"handle\">{{ vm.handle }} </a><button ng-click=\"vm.logout()\" ng-show=\"vm.loggedIn\" class=\"clean logout\">Log out</button><button type=\"button\" focus-on-click=\"focus-on-click\" ng-show=\"vm.loggedIn\" class=\"clean message-notifications\"><svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 19.6 13.6\" enable-background=\"new 0 0 19.6 13.6\" xml:space=\"preserve\"> <path fill=\"#676767\" d=\"M19.6,1.6V1.4c0-0.8-0.6-1.4-1.4-1.4H1.4C0.6,0,0,0.6,0,1.4v0.2l9.8,4.6L19.6,1.6z\"/><path fill=\"#676767\" d=\"M9.8,7.4L0,2.7v9.4c0,0.8,0.6,1.4,1.4,1.4h16.7c0.8,0,1.4-0.6,1.4-1.4V2.7L9.8,7.4z\"/></svg><div ng-show=\"vm.unreadCount &gt; 0\" class=\"notification\">{{ vm.unreadCount }}</div></button><div class=\"popup\"><threads subscriber-id=\"{{ vm.subscriberId }}\"></threads></div></div>");
$templateCache.put("views/layout-footer.directive.html","<footer class=\"layout-footer\"><ul><li><a ui-sref=\"register\">Sign up</a></li><li><a ui-sref=\"#\">Help</a></li><li><a ui-sref=\"#\">About</a></li></ul></footer>");
$templateCache.put("views/layout-project-nav.directive.html","<ul ng-if=\"show\" class=\"project-nav\"><li><a ui-sref=\"timeline({ workId: workId })\">Timeline</a></li><li><a ui-sref=\"messaging({ id: workId })\">Messaging</a></li></ul>");}]);