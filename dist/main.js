(function() {
  'use strict';
  var dependencies;

  dependencies = ['appirio-tech-ng-auth', 'appirio-tech-ng-api-services', 'appirio-tech-messaging', 'appirio-tech-ng-ui-components', 'duScroll'];

  angular.module('appirio-tech-ng-work-layout', dependencies);

}).call(this);

(function() {
  'use strict';
  var LayoutHeaderController;

  LayoutHeaderController = function($scope, $state, UserV3Service, WorkAPIService, ThreadsAPIService, AuthService, $rootScope) {
    var activate, getNotificationCount, onProjectChange, onUserChange, vm;
    vm = this;
    vm.homeHref = $state.href('home');
    vm.workId = $scope.workId;
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
    onProjectChange = function(newVal) {
      return vm.appName = newVal || '';
    };
    activate = function() {
      $scope.$watch('UserV3Service.getCurrentUser()', onUserChange);
      return $rootScope.$watch('submitWorkAppName', onProjectChange);
    };
    activate();
    return vm;
  };

  LayoutHeaderController.$inject = ['$scope', '$state', 'UserV3Service', 'WorkAPIService', 'ThreadsAPIService', 'AuthService', '$rootScope'];

  angular.module('appirio-tech-ng-work-layout').controller('LayoutHeaderController', LayoutHeaderController);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function($location, $rootScope) {
    var link;
    link = function($scope, element, attrs) {
      var setPageClass;
      setPageClass = function(e, data) {
        var classes;
        if ($location.$$url === '/') {
          return $(element[0]).addClass('getting-started');
        } else {
          classes = $location.$$path.replace(/\//g, ' ');
          return $(element[0]).addClass(classes);
        }
      };
      $rootScope.$on('$locationChangeStart', setPageClass);
      return setPageClass();
    };
    return {
      restrict: 'A',
      link: link
    };
  };

  directive.$inject = ['$location', '$rootScope'];

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
      scope: {
        workId: '@workId'
      }
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
  var dir;

  dir = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/layout-project-nav.directive.html',
      scope: {
        workId: '@workId'
      }
    };
  };

  dir.$inject = [];

  angular.module('appirio-tech-ng-work-layout').directive('layoutProjectNav', dir);

}).call(this);

angular.module("appirio-tech-ng-work-layout").run(["$templateCache", function($templateCache) {$templateCache.put("views/layout-header.directive.html","<a ng-home-link=\"ng-home-link\" href=\"{{ vm.homeHref }}\" class=\"clean logo\">ASP</a><ul class=\"links\"><li><a ui-sref=\"view-work-multiple\">Dashboard</a></li><li class=\"projects\"><button focus-on-click=\"focus-on-click\" class=\"clean\">Projects &dtrif; </button><ul class=\"sublinks elevated\"><li><a ui-sref=\"submit-work\">Create New Project</a></li><li ng-repeat=\"project in vm.projects\"><a ui-sref=\"timeline({ workId: project.id })\">{{ project.name }}</a></li></ul></li><li ng-hide=\"vm.loggedIn\"><a ui-sref=\"login\">Log in</a></li><li ng-show=\"vm.loggedIn\" class=\"profile\"><button focus-on-click=\"focus-on-click\" class=\"clean\"><avatar></avatar></button><ul class=\"sublinks elevated\"><li><a ng-click=\"vm.logout()\">Logout</a></li><li><a ui-sref=\"submit-work\">Settings</a></li></ul></li><li ng-show=\"vm.loggedIn\" class=\"notifications\"><button type=\"button\" focus-on-click=\"focus-on-click\" class=\"clean\"><div ng-show=\"vm.unreadCount &gt; 0\" class=\"notification\">{{ vm.unreadCount }}</div></button><div class=\"popup elevated\"><threads subscriber-id=\"{{ vm.subscriberId }}\"></threads></div></li></ul><h1 class=\"app-name\">{{ vm.appName }}</h1>");
$templateCache.put("views/layout-footer.directive.html","<footer class=\"layout-footer\"><ul><li><a ui-sref=\"register\">Sign up</a></li><li><a ui-sref=\"#\">Help</a></li><li><a ui-sref=\"#\">About</a></li></ul></footer>");
$templateCache.put("views/layout-project-nav.directive.html","<ul><li class=\"active\"><a ui-sref=\"timeline({ workId: workId })\">Timeline</a></li><li><a ui-sref=\"submissions({ id: workId })\">Submissions</a></li><li><a ui-sref=\"messaging({ id: workId })\">Messaging</a></li><li><a ui-sref=\"project-requirements({ id: workId })\">Project reqs</a></li><li><a ui-sref=\"project-settings({ id: workId })\">Project settings</a></li></ul>");}]);