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
      controller: 'LayoutHeaderController as vm'
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
      templateUrl: 'views/layout-footer.directive.html'
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

angular.module("appirio-tech-ng-work-layout").run(["$templateCache", function($templateCache) {$templateCache.put("views/layout-main.directive.html","<div class=\"outer-container\"><layout-project-nav></layout-project-nav><main role=\"main\" ui-view=\"\" class=\"layout-main {{ vm.pageClass }}\"></main></div>");}]);