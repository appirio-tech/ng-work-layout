configs =
  __dirname : __dirname

configs.templateCache = []

configs.templateCache.push
  files : [
    '.tmp/views/layout-main.directive.html'
  ]
  root  : 'views/'
  module: 'appirio-tech-ng-layout'

configs.templateCache.push
  fileName: 'example-templates.js'
  files : [
    '.tmp/views/home.html'
  ]
  root  : 'views/'
  module: 'example'

### END CONFIG ###
loadTasksModule = require __dirname + '/node_modules/appirio-gulp-tasks/load-tasks.coffee'

loadTasksModule.loadTasks configs
