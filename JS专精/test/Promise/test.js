const Promise = require('../../src/Promise/index')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { assert } = require('chai')
chai.use(sinonChai)

describe("Promise", () => {
    it("是一个类", () => {
        assert.isFunction(Promise)
        assert.isObject(Promise.prototype)
    })
    it("Promise 不接收函数就报错", () => {
        assert.throw( () => {
            new Promise(true)
        })
        assert.throw( () => {
            new Promise(20)
        })
    })
    it("new Promise(fn) 会生成一个对象，这个对象会生成 then 方法", () => {
        const promise = new Promise(() => {})
        assert.isFunction(promise.then)
    })
    it("new Promise(fn)中的fn会立即执行", () => {
        let fn = sinon.fake()
        new Promise(fn)
        assert(fn.called)
    })
    it("new Promise(fn)中的fn接收resolve和reject两个函数", () => {
        new Promise((resolve, reject) => {
            assert.isFunction(resolve)
            assert.isFunction(reject)
        })
    })
    it("Promise.then(success)中的success会在resolved时被调用", (done) => {
        let success = sinon.fake()
        const promise = new Promise((resolve, reject) => {
            //该函数没有执行
            assert.isFalse(success.called)
            resolve()
            //该函数执行了
            setTimeout(() => {
                assert.isTrue(success.called)
                done()
            }, 0)
        })
        promise.then(success)
    })
    it("2.2.2", (done) => {
        const success = sinon.fake()
        const promise = new Promise((resolve) => {
            assert.isFalse(success.called)
            resolve('hi')
            resolve('hi')
            setTimeout(() => {
                assert(promise.state === 'fulfilled')
                assert(success.calledOnce)
                assert(success.calledWith('hi'))
                done()
            }, 0)
        })
        promise.then(success)
    })
    it("2.2.3", (done) => {
        const fail = sinon.fake()
        const promise = new Promise((resolve,reject) => {
            assert.isFalse(fail.called)
            reject('hi')
            reject('hi')
            setTimeout(() => {
                assert(promise.state === 'rejected')
                assert(fail.calledOnce)
                assert(fail.calledWith('hi'))
                done()
            }, 0)
        })
        promise.then(null,fail)
    })
    it('在我的代码执行完之前，不能调用then中的两个函数', (done) => {
        const success = sinon.fake()
        const promise = new Promise((resolve) => {
            resolve('hi')
        })
        promise.then(success)
        console.log(1)  //即在该行代码执行完之前不能调用success函数
        assert.isFalse(success.called)  
        setTimeout(() => {
            assert.isTrue(success.called)
            done()
        }, 0)
    })
    it('2.2.5', (done) => {
        const promise = new Promise((resolve) => {
            resolve('hi')
        })
        promise.then(function() {
            'use strict'
            // console.log('====')
            // console.log(this)
            assert(this === undefined)
            done()  //then是异步调用的
        })
    })
    it('2.2.6 当promise的状态变为fulfilled或rejected后Promise.then可以在同一个promise里被多次调用', (done) => {
        const promise = new Promise((resolve) => {
            resolve('hi')
        })
        const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
        promise.then(callbacks[0])
        promise.then(callbacks[1])
        promise.then(callbacks[2])
        setTimeout(() => {
            assert(callbacks[0].called)
            assert(callbacks[1].calledAfter(callbacks[0]))
            assert(callbacks[2].calledAfter(callbacks[1]))
            done()
        }, 0)
    })
    it('2.2.7', () => {
        
    })
})