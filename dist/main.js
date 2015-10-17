(function() {
  'use strict';
  var dependencies;

  dependencies = ['appirio-tech-ng-auth', 'appirio-tech-ng-api-services', 'appirio-tech-ng-messaging', 'appirio-tech-ng-ui-components', 'duScroll'];

  angular.module('appirio-tech-ng-work-layout', dependencies);

}).call(this);

(function() {
  'use strict';
  var LayoutHeaderController;

  LayoutHeaderController = function($scope, $state, UserV3Service, WorkAPIService, ThreadsAPIService, AuthService, SubmitWorkAPIService, $rootScope) {
    var activate, getNotificationCount, onProjectChange, onUserChange, setAppName, vm;
    vm = this;
    vm.homeHref = $state.href('home');
    vm.workId = $scope.workId;
    vm.isSubmitWork = false;
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
    onProjectChange = function(response) {
      if (response.name) {
        return vm.appName = response.name;
      } else {
        return vm.appName = '';
      }
    };
    setAppName = function(stateName) {
      var hiddenAppNameStates;
      hiddenAppNameStates = {
        'view-work-multiple': true,
        'view-projects.open': true,
        'view-projects.assigned': true
      };
      if (!hiddenAppNameStates[stateName]) {
        return vm.showAppName = true;
      }
    };
    activate = function() {
      var params;
      params = {
        id: vm.workId
      };
      $scope.$watch(UserV3Service.getCurrentUser, onUserChange);
      setAppName($state.current.name);
      if (vm.workId) {
        return SubmitWorkAPIService.get(params, onProjectChange);
      }
    };
    activate();
    return vm;
  };

  LayoutHeaderController.$inject = ['$scope', '$state', 'UserV3Service', 'WorkAPIService', 'ThreadsAPIService', 'AuthService', 'SubmitWorkAPIService', '$rootScope'];

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
      controller: 'ProjectNavController as vm',
      scope: {
        workId: '@workId'
      }
    };
  };

  dir.$inject = [];

  angular.module('appirio-tech-ng-work-layout').directive('layoutProjectNav', dir);

}).call(this);

(function() {
  'use strict';
  var ProjectNavController;

  ProjectNavController = function($scope, $state) {
    var activate, activateLink, vm;
    vm = this;
    vm.workId = $scope.workId;
    vm.threadId = "threadfor-" + vm.workId;
    activateLink = function() {
      var isSubmission, stateName;
      stateName = $state.current.name;
      isSubmission = stateName === 'submissions' || stateName === 'final-designs' || stateName === 'final-designs' || stateName === 'final-fixes';
      if (isSubmission) {
        return vm.activeLink = 'submissions';
      } else {
        return vm.activeLink = stateName;
      }
    };
    activate = function() {
      activateLink();
      return vm;
    };
    return activate();
  };

  ProjectNavController.$inject = ['$scope', '$state'];

  angular.module('appirio-tech-ng-work-layout').controller('ProjectNavController', ProjectNavController);

}).call(this);

angular.module("appirio-tech-ng-work-layout").run(["$templateCache", function($templateCache) {$templateCache.put("views/layout-header.directive.html","<ul class=\"flex center middle\"><li><a ng-home-link=\"ng-home-link\" href=\"{{ vm.homeHref }}\" class=\"clean logo\">ASP</a></li><li class=\"app-name\"><h4 ng-if=\"vm.showAppName\">{{ vm.appName }}</h4></li><li><ul class=\"links\"><li ng-show=\"vm.loggedIn\"><a ui-sref=\"view-work-multiple\">Dashboard</a></li><li ng-show=\"vm.loggedIn\" class=\"projects\"><button focus-on-click=\"focus-on-click\" class=\"clean\">Projects &dtrif;</button><ul class=\"sublinks elevated\"><li><a ui-sref=\"submit-work\">Create New Project</a></li><li ng-repeat=\"project in vm.projects\"><a ui-sref=\"timeline({ workId: project.id })\"><div class=\"name\">{{ project.name }} a really long name</div><div class=\"notification\">123</div></a></li></ul></li><li ng-hide=\"vm.loggedIn\" class=\"login\"><a ui-sref=\"login\">Log in</a></li><li ng-show=\"vm.loggedIn\" class=\"profile\"><button focus-on-click=\"focus-on-click\" class=\"clean\"><avatar></avatar></button><ul class=\"sublinks elevated\"><li><a href=\"#\">View Profile</a></li><li><a ng-click=\"vm.logout()\">Logout</a></li><li><a ui-sref=\"submit-work\">Settings</a></li></ul></li><li ng-show=\"vm.loggedIn\" class=\"notifications\"><button type=\"button\" focus-on-click=\"focus-on-click\" class=\"clean\"><div ng-show=\"vm.unreadCount &gt; 0\" class=\"notification\">{{ vm.unreadCount }}</div></button><div class=\"popup elevated\"><threads subscriber-id=\"{{ vm.subscriberId }}\"></threads></div></li></ul></li></ul>");
$templateCache.put("views/layout-footer.directive.html","<footer class=\"layout-footer\"><ul><li><a ui-sref=\"register\">Sign up</a></li><li><a ui-sref=\"#\">Help</a></li><li><a ui-sref=\"#\">About</a></li><li><a ui-sref=\"view-projects.assigned\">Copilot</a></li></ul></footer>");
$templateCache.put("views/layout-project-nav.directive.html","<ul><li ng-class=\"{active: vm.activeLink == \'timeline\'}\"><a ui-sref=\"timeline({ workId: vm.workId })\">Timeline</a></li><li ng-class=\"{active: vm.activeLink == \'submissions\'}\"><a ui-sref=\"submissions({ projectId: vm.workId })\">Submissions</a></li><li ng-class=\"{active: vm.activeLink == \'messaging\'}\"><a ui-sref=\"messaging({ id: vm.workId, threadId: vm.threadId })\">Messaging</a></li><li ng-class=\"{active: vm.activeLink == \'project-requirements\'}\"><a ui-sref=\"project-requirements({ id: vm.workId })\">Project reqs</a></li><li ng-class=\"{active: vm.activeLink == \'project-settings\'}\"><a ui-sref=\"project-settings({ id: workId })\">Project settings</a></li></ul>");}]);