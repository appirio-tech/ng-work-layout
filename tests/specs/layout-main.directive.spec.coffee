'use strict'

element = null
html    = '<main role="main" layout-main="layout-main" class="layout-main"><h2>fake manage page</h2></main>'

describe 'LayoutMain Directive', ->
  beforeEach inject ($compile, $rootScope) ->
    compiled = $compile html
    element  = compiled $rootScope

    $rootScope.$digest()

  it 'element should have some html', ->
    expect(element.html().length).to.be.ok