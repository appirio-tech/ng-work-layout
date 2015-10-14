'use strict'

element = null
html    = '<layout-header work-id="123"></layout-header>'

describe 'LayoutHeader Directive', ->
  beforeEach inject ($compile, $rootScope, $httpBackend) ->
    compiled = $compile html
    element  = compiled $rootScope

    $rootScope.$digest()

    $httpBackend.flush()

  it 'element should have some html', ->
    expect(element.html().length).to.be.ok