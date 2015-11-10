configs =
  __dirname : __dirname

configs.templateCache = []

configs.templateCache.push
  files : [
    '.tmp/views/layout-main.directive.html'
    '.tmp/views/layout-header.directive.html'
    '.tmp/views/layout-footer.directive.html'
    '.tmp/views/layout-project-nav.directive.html'
  ]
  root  : 'views/'
  module: 'appirio-tech-ng-work-layout'

configs.templateCache.push
  fileName: 'example-templates.js'
  files : [
    '.tmp/views/*.example.html'
  ]
  root  : 'views/'
  module: 'example'

### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs
