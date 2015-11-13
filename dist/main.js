(function() {
  'use strict';
  var dependencies;

  dependencies = ['appirio-tech-ng-auth', 'appirio-tech-ng-api-services', 'appirio-tech-ng-ui-components', 'appirio-tech-submissions', 'duScroll'];

  angular.module('appirio-tech-ng-work-layout', dependencies);

}).call(this);

(function() {
  'use strict';
  var LayoutHeaderController;

  LayoutHeaderController = function($scope, $state, UserV3Service, ThreadsAPIService, SubmitWorkAPIService, InboxesProjectAPIService) {
    var activate, getNotificationCount, onProjectChange, onUserChange, setAppName, vm;
    vm = this;
    vm.homeHref = $state.href('home');
    vm.workId = $scope.workId;
    vm.userType = $scope.userType || 'customer';
    vm.isSubmitWork = false;
    getNotificationCount = function(id) {
      var resource;
      resource = InboxesProjectAPIService.get();
      return resource.$promise.then(function(response) {
        return vm.unreadCount = response.totalUnreadCount;
      });
    };
    onUserChange = function() {
      var user;
      user = UserV3Service.getCurrentUser();
      if (user != null ? user.id : void 0) {
        vm.loggedIn = true;
        vm.subscriberId = user.id;
        vm.handle = user.handle;
        vm.userAvatar = user.avatar;
        if (vm.userType === 'customer') {
          vm.homeHref = $state.href('view-work-multiple');
        } else {
          vm.homeHref = $state.href('copilot-projects');
        }
        return getNotificationCount(user.id);
      } else {
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
        'copilot-projects': true,
        'copilot-open-projects': true
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

  LayoutHeaderController.$inject = ['$scope', '$state', 'UserV3Service', 'ThreadsAPIService', 'SubmitWorkAPIService', 'InboxesProjectAPIService'];

  angular.module('appirio-tech-ng-work-layout').controller('LayoutHeaderController', LayoutHeaderController);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'A'
    };
  };

  directive.$inject = [];

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
        workId: '@workId',
        userType: '@userType'
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
        workId: '@workId',
        userType: '@userType'
      }
    };
  };

  dir.$inject = [];

  angular.module('appirio-tech-ng-work-layout').directive('layoutProjectNav', dir);

}).call(this);

(function() {
  'use strict';
  var ProjectNavController;

  ProjectNavController = function($scope, $state, StepsService, ProjectsAPIService, $rootScope) {
    var activate, onChange, vm;
    vm = this;
    vm.workId = $scope.workId;
    vm.currentStepId = null;
    vm.threadId = null;
    vm.userType = $scope.userType || 'customer';
    vm.currentStep = null;
    onChange = function() {
      var currentStep, isSubmissionState, stateName, submissionsStates;
      currentStep = vm.stepId ? StepsService.getStepById(vm.workId, vm.stepId) : StepsService.getCurrentStep(vm.workId);
      if (currentStep) {
        vm.currentStepId = currentStep.id;
      }
      stateName = $state.current.name;
      submissionsStates = ['step', 'submission-detail', 'file-detail'];
      isSubmissionState = submissionsStates.indexOf(stateName) > -1;
      vm.activeLink = stateName;
      if (isSubmissionState) {
        return vm.activeLink = 'submissions';
      }
    };
    activate = function() {
      var destroyStepsListener, params, resource;
      if (vm.workId) {
        params = {
          id: vm.workId
        };
        resource = ProjectsAPIService.get(params);
        resource.$promise.then(function(response) {
          return vm.threadId = response.threadId;
        });
      }
      destroyStepsListener = $rootScope.$on('StepsService:changed', function() {
        return onChange();
      });
      $scope.$on('$destroy', function() {
        return destroyStepsListener();
      });
      return onChange();
    };
    activate();
    return vm;
  };

  ProjectNavController.$inject = ['$scope', '$state', 'StepsService', 'ProjectsAPIService', '$rootScope'];

  angular.module('appirio-tech-ng-work-layout').controller('ProjectNavController', ProjectNavController);

}).call(this);

(function() {
  'use strict';
  var dir;

  dir = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/project-drop-down.directive.html',
      controller: 'ProjectDropDownController as vm',
      scope: {
        userType: '@userType'
      }
    };
  };

  dir.$inject = [];

  angular.module('appirio-tech-ng-work-layout').directive('projectDropDown', dir);

}).call(this);

(function() {
  'use strict';
  var dir;

  dir = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/user-drop-down.directive.html',
      controller: 'UserDropDownController as vm',
      scope: true
    };
  };

  dir.$inject = [];

  angular.module('appirio-tech-ng-work-layout').directive('userDropDown', dir);

}).call(this);

(function() {
  'use strict';
  var UserDropDownController;

  UserDropDownController = function($scope, UserV3Service, AuthService) {
    var activate, onUserChange, vm;
    vm = this;
    vm.handle = '';
    onUserChange = function() {
      var user;
      user = UserV3Service.getCurrentUser();
      return vm.handle = user != null ? user.handle : void 0;
    };
    vm.logout = function() {
      return AuthService.logout().then(function() {
        return $state.go('login');
      });
    };
    activate = function() {
      $scope.$watch(UserV3Service.getCurrentUser, onUserChange);
      return vm;
    };
    return activate();
  };

  UserDropDownController.$inject = ['$scope', 'UserV3Service', 'AuthService'];

  angular.module('appirio-tech-ng-work-layout').controller('UserDropDownController', UserDropDownController);

}).call(this);

(function() {
  'use strict';
  var ProjectDropDownController;

  ProjectDropDownController = function($scope, UserV3Service, WorkAPIService, ProjectsAPIService) {
    var activate, onUserChange, vm;
    vm = this;
    vm.userType = $scope.userType || 'customer';
    vm.projects = [];
    onUserChange = function() {
      var params, resource, user;
      user = UserV3Service.getCurrentUser();
      if (user != null ? user.id : void 0) {
        if (vm.userType === 'customer') {
          resource = WorkAPIService.get();
          return resource.$promise.then(function(response) {
            return vm.projects = response;
          });
        } else {
          params = {
            filter: "copilotId=" + user.id
          };
          resource = ProjectsAPIService.query(params);
          return resource.$promise.then(function(response) {
            return vm.copilotProjects = response;
          });
        }
      }
    };
    activate = function() {
      $scope.$watch(UserV3Service.getCurrentUser, onUserChange);
      return vm;
    };
    return activate();
  };

  ProjectDropDownController.$inject = ['$scope', 'UserV3Service', 'WorkAPIService', 'ProjectsAPIService'];

  angular.module('appirio-tech-ng-work-layout').controller('ProjectDropDownController', ProjectDropDownController);

}).call(this);

(function() {
  'use strict';
  var directive;

  directive = function() {
    return {
      restrict: 'E',
      templateUrl: 'views/message-drop-down.directive.html',
      controller: 'MessageDropDownController as vm',
      scope: {
        subscriberId: '@subscriberId',
        userType: '@userType'
      }
    };
  };

  directive.$inject = [];

  angular.module('appirio-tech-ng-work-layout').directive('messageDropDown', directive);

}).call(this);

(function() {
  'use strict';
  var MessageDropDownController;

  MessageDropDownController = function($scope, $state, InboxesProjectAPIService) {
    var activate, getUserThreads, removeBlanksAndOrder, vm;
    vm = this;
    vm.loadingThreads = false;
    vm.userType = $scope.userType || 'customer';
    if (vm.userType === 'customer') {
      vm.threadHref = 'messaging';
    } else {
      vm.threadHref = 'copilot-messaging';
    }
    removeBlanksAndOrder = function(threads) {
      var i, len, noBlanks, orderedThreads, ref, thread;
      noBlanks = [];
      if (threads) {
        for (i = 0, len = threads.length; i < len; i++) {
          thread = threads[i];
          if (thread != null ? (ref = thread.messages) != null ? ref.length : void 0 : void 0) {
            noBlanks.push(thread);
          }
        }
        noBlanks;
        orderedThreads = noBlanks != null ? noBlanks.sort(function(previous, next) {
          return new Date(next.messages[next.messages.length - 1].createdAt) - new Date(previous.messages[previous.messages.length - 1].createdAt);
        }) : void 0;
        return orderedThreads;
      }
    };
    getUserThreads = function() {
      var resource;
      vm.loadingThreads = true;
      resource = InboxesProjectAPIService.get();
      resource.$promise.then(function(response) {
        vm.threads = removeBlanksAndOrder(response != null ? response.threads : void 0);
        return vm.totalUnreadCount = response != null ? response.totalUnreadCount : void 0;
      });
      resource.$promise["catch"](function() {});
      return resource.$promise["finally"](function() {
        return vm.loadingThreads = false;
      });
    };
    activate = function() {
      $scope.$watch('subscriberId', function() {
        return getUserThreads();
      });
      return vm;
    };
    return activate();
  };

  MessageDropDownController.$inject = ['$scope', '$state', 'InboxesProjectAPIService'];

  angular.module('appirio-tech-ng-work-layout').controller('MessageDropDownController', MessageDropDownController);

}).call(this);

angular.module("appirio-tech-ng-work-layout").run(["$templateCache", function($templateCache) {$templateCache.put("views/layout-footer.directive.html","<footer class=\"layout-footer\"><ul><li><a ui-sref=\"register\">Sign up</a></li><li><a ui-sref=\"#\">Help</a></li><li><a ui-sref=\"#\">About</a></li><li><a ui-sref=\"copilot-projects\">Copilot Dashboard</a></li></ul></footer>");
$templateCache.put("views/layout-header.directive.html","<ul class=\"flex center middle\"><li><a ng-home-link=\"ng-home-link\" href=\"{{ vm.homeHref }}\" ng-if=\"vm.userType != \'member\'\" class=\"clean logo\"><img src=\"/images/asp-logo.svg\"/></a><img src=\"/images/asp-logo.svg\" ng-if=\"vm.userType == \'member\'\"/></li><li class=\"app-name\"><h4 ng-if=\"vm.showAppName\">{{ vm.appName }}</h4></li><li><ul ng-if=\"vm.userType != \'member\'\" class=\"links\"><li ng-show=\"vm.loggedIn\" class=\"dashboard\"><a ng-if=\"vm.userType == \'customer\' \" ui-sref=\"view-work-multiple\">Dashboard</a><a ng-if=\"vm.userType != \'customer\' \" ui-sref=\"copilot-projects\">Dashboard</a></li><li ng-show=\"vm.loggedIn\" class=\"projects\"><button focus-on-click=\"focus-on-click\" class=\"clean\">Projects <span class=\"caret\">&dtrif;</span></button><project-drop-down user-type=\"{{ vm.userType }}\" class=\"drop-down transition elevated\"></project-drop-down></li><li ng-hide=\"vm.loggedIn\" class=\"login\"><a ui-sref=\"login\" class=\"button hollow\">Log in</a></li><li ng-show=\"vm.loggedIn\" class=\"profile\"><button focus-on-click=\"focus-on-click\" class=\"clean\"><avatar avatar-url=\"{{vm.userAvatar}}\"></avatar></button><user-drop-down class=\"drop-down transition elevated\"></user-drop-down></li><li ng-show=\"vm.loggedIn\" class=\"notifications\"><button type=\"button\" focus-on-click=\"focus-on-click\" class=\"clean\"><div ng-class=\"{ danger: vm.unreadCount &gt; 0 }\" class=\"notification\">{{ vm.unreadCount || 0 }}</div></button><message-drop-down ng-if=\"vm.userType == \'customer\'\" subscriber-id=\"{{ vm.subscriberId }}\" class=\"drop-down transition elevated\"></message-drop-down><message-drop-down ng-if=\"vm.userType != \'customer\'\" subscriber-id=\"{{ vm.subscriberId }}\" user-type=\"copilot\" class=\"drop-down transition elevated\"></message-drop-down></li></ul></li></ul>");
$templateCache.put("views/layout-project-nav.directive.html","<ul><li ng-class=\"{active: vm.activeLink == \'timeline\'}\" ng-if=\"vm.userType == \'customer\'\"><a ui-sref=\"timeline({ workId: vm.workId })\">Timeline</a></li><li ng-class=\"{active: vm.activeLink == \'submissions\'}\" ng-if=\"vm.userType == \'customer\'\"><a ui-sref=\"step({ projectId: vm.workId, stepId: vm.currentStepId })\">Submissions</a></li><li ng-class=\"{active: vm.activeLink == \'messaging\'}\" ng-if=\"vm.userType == \'customer\'\"><a ui-sref=\"messaging({ id: vm.workId, threadId: vm.threadId })\">Messaging</a></li><li ng-class=\"{active: vm.activeLink == \'project-details\'}\" ng-if=\"vm.userType == \'customer\'\"><a ui-sref=\"project-details({ id: vm.workId })\">Project details</a></li><li ng-class=\"{active: vm.activeLink == \'copilot-project-details\'}\" ng-if=\"vm.userType != \'customer\'\"><a ui-sref=\"copilot-project-details({ id: vm.workId })\">Project details</a></li><li ng-class=\"{active: vm.activeLink == \'copilot-messaging\'}\" ng-if=\"vm.userType != \'customer\'\"><a ui-sref=\"copilot-messaging({ id: vm.workId, threadId: vm.threadId })\">Messaging</a></li><li ng-class=\"{active: vm.activeLink == \'copilot-submissions\'}\" ng-if=\"vm.userType != \'customer\'\"><a ui-sref=\"step({ projectId: vm.workId, stepId: vm.currentStepId })\">Submissions</a></li><li ng-class=\"{active: vm.activeLink == \'copilot-status-reports\'}\" ng-if=\"vm.userType != \'customer\'\"><a ui-sref=\"copilot-status-reports({ id: vm.workId})\">Status Reports</a></li></ul>");
$templateCache.put("views/message-drop-down.directive.html","<header>messages</header><ul><li ng-repeat=\"thread in vm.threads track by $index\"><a ui-sref=\"{{vm.threadHref}}({ id: thread.projectId, threadId: thread.id })\" ng-class=\"{unread: thread.unreadCount &gt; 0}\"><div class=\"app-name\">{{thread.subject}}</div><div class=\"sender\"><avatar avatar-url=\"{{ thread.messages[thread.messages.length -1].publisher.avatar }}\"></avatar><div class=\"name\">{{thread.messages[thread.messages.length -1].publisher.handle}}</div><time>{{ thread.messages[thread.messages.length -1].createdAt | timeLapse }}</time></div><p class=\"message\">{{ thread.messages[thread.messages.length -1].body }}</p></a></li><li ng-if=\"vm.threads.length == 0\" class=\"no-messages\"><p>You have no messages.</p></li></ul>");
$templateCache.put("views/project-drop-down.directive.html","<header>projects</header><ul><li ng-if=\"vm.userType == \'customer\'\"><a ui-sref=\"submit-work\">Create New Project</a></li><li ng-if=\"vm.userType == \'customer\' \" ng-repeat=\"project in vm.projects\"><a ui-sref=\"timeline({ workId: project.id })\">{{ project.name }}</a></li><li ng-if=\"vm.userType != \'customer\' \" ng-repeat=\"project in vm.copilotProjects\"><a ui-sref=\"copilot-project-details({ id: project.id })\">{{ project.name }}</a></li></ul>");
$templateCache.put("views/user-drop-down.directive.html","<header>{{ vm.handle }}</header><ul><li><a href=\"#\">View Profile</a></li><li><a ui-sref=\"submit-work\">Settings</a></li><li><a ng-click=\"vm.logout()\">LOGOUT</a></li></ul>");}]);