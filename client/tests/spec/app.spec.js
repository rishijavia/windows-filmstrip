import Vue from 'vue'
import AppComponent from '../../src/App.vue'
var Api = require('../../src/services/Api')
var expect = require('expect')

describe('App.vue', () => {

  // Inspect the raw component options
  it('has a created hook', () => {
    expect(typeof AppComponent.created).toBe('function')
  })

  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof AppComponent.data).toBe('function')
    var defaultData = AppComponent.data()
    expect(defaultData.currentScroll).toBe(0)
    expect(defaultData.imageURL).toBe(Api.URL + '/images/large/')
    expect(defaultData.thumbnailURL).toBe(Api.URL + '/images/thumbnails/')
    expect(defaultData.imageLink).toBe('')
  })

  // Evaluate the results of computed function

  // Test scrollTemplates function
  it('slices the templates by n,4', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3,4,5,6,7,8]
    vm.currentScroll = 2
    expect(vm.scrollTemplates).toEqual([3,4,5,6])
  })

  // Test disableNext function
  it('returns disabled if canMoveNext is false', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3]
    expect(vm.disableNext).toEqual('disabled')
  })

  it('does not return if canMoveNext is true', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3,4,5,6]
    expect(vm.disableNext).toEqual(undefined)
  })

  // Test disablePrev function
  it('returns disabled if canMovePrev is false', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3]
    expect(vm.disableNext).toEqual('disabled')
  })

  it('does not return if canMovePrev is true', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3,4,5,6]
    expect(vm.disableNext).toEqual(undefined)
  })

  // Evaluate the results of methods function

  // Test showTemplate function
  it('sets template to the template provided in argument', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.showTemplate({hello : "world"})
    expect(vm.template).toEqual({hello : "world"})
  })

  // Test moveNext function
  it('increases currentScroll by 4 if canMoveNext is true', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3,4,5,6,7,8,9]
    vm.moveNext()
    expect(vm.currentScroll).toEqual(4)
  })

  it('does not increase currentScroll if canMoveNext is false', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3]
    vm.moveNext()
    expect(vm.currentScroll).toEqual(0)
  })

  // Test movePrev function
  it('decreases currentScroll by 4 if canMoveNext is true', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3,4,5,6,7,8,9]
    vm.moveNext()
    expect(vm.currentScroll).toEqual(4)
  })

  it('does not decrese currentScroll if canMoveNext is false', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3]
    vm.moveNext()
    expect(vm.currentScroll).toEqual(0)
  })

  // Test canMoveNext function
  it('returns true if templates has currentScroll + 4 elements', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3,4,5]
    expect(vm.canMoveNext()).toEqual(true)
  })

  it('returns false if templates does not have currentScroll + 4 elements', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3]
    expect(vm.canMoveNext()).toEqual(false)
  })

  // Test canMovePrev function
  it('returns true if templates has currentScroll - 4 elements', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3,4,5]
    vm.currentScroll = 4
    expect(vm.canMovePrev()).toEqual(true)
  })

  it('returns false if templates does not have currentScroll - 4 elements', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [1,2,3]
    expect(vm.canMovePrev()).toEqual(false)
  })

  // Test updateTemplate function
  it('updates template if it finds template with the id provided in argument', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.templates = [{id: '1', word: 'hello'}, {id: '2', word: 'world'}]
    vm.template = vm.templates[0]
    vm.updateTemplate('2')
    expect(vm.template).toEqual(vm.templates[1])
  })

  // Test setActive function
  it('returns active if current templates id matches the id provided in argument', () => {
    const vm = new Vue(AppComponent).$mount()
    vm.template = {id: '1', word: 'hello'}
    expect(vm.setActive('1')).toEqual('active')
  })

})
