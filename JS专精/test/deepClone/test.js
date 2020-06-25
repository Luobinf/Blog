const deepClone = require('../../src/deepClone/index')
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { assert } = require('chai')
chai.use(sinonChai)

//注意该深拷贝并没有考虑到爆战情况，如果需要考虑，则需要换数据结构
describe('deepClone',() => {
    it('这是一个函数',() => {
        assert.isFunction(deepClone)
    })
    it('能够复制基本类型',() => {
        const a = 10
        const a2 = deepClone(a)
        assert(a === a2)
        const b = 'string'
        const b2 = deepClone(b)
        assert(b === b2)
        const c = true
        const c2 = deepClone(c)
        assert(c === c2)
        const d = null
        const d2 = deepClone(d)
        assert(d === d2)
        const e = undefined
        const e2 = deepClone(e)
        assert(e === e2)
        const f = Symbol()
        const f2 = deepClone(f)
        assert(f === f2)
        const g = BigInt(123456789123456789)
        const g2 = deepClone(g)
        assert(g === g2)
    })
    describe('对象',() => {
        it('能够复制普通对象',() => {
            const a = {name: 'jack',info: {age: 23,address: 'HZ'}}
            const a2 = deepClone(a)
            console.log(a2)
            assert(a !== a2)
            assert(a.name === a2.name)
        })
        it('能够复制数组', () => {
            const a = [1,2,[50,60,70],'23']
            const a2 = deepClone(a)
            console.log(a2)
            assert(a !== a2)
            assert(a[0] === a2[0])
            assert(a[1] === a2[1])
            assert(a[2] !== a2[2])
            assert(a[3] === a2[3])
        })
        it('能够复制函数', () => {
            let a = function () {return 20}
            a.xxx = 'fn'
            a.info = {address: 'HZ',age: 25}
            const a2 = deepClone(a)
            console.log(a2)
            assert(a !== a2)
            assert(a.xxx === a2.xxx)
            assert(a.info !== a2.info)
        })
        it('环也能复制', () => {
            const a = {name: 'jack'}
            a.self = a
            const a2 = deepClone(a)
            // console.log(a2)
            assert(a !== a2)       
        })
        it('可以复制正则表达式', () => {
            const a = /hello\d+/gi
            const a2 = deepClone(a)
            assert(a !== a2)
            assert(a.source === a2.source)
            assert(a.flags === a2.flags)       
        })
        it('可以复制Date', () => {
            const a = new Date()
            const a2 = deepClone(a)
            assert(a !== a2)
            assert(a.getTime() === a2.getTime())
        })
    })
})