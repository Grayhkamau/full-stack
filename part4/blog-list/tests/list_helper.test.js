const {test,describe} = require('node:test');
const assert = require('node:assert');
const list_helper =  require('../utils/list_helper');


test('dummy', ()=>{
    assert.strictEqual(list_helper.dummy([]), 1)
})