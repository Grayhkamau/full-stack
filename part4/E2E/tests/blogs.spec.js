const {test, describe, beforeEach, expect} = require("@playwright/test");


describe('Blogs App', ()=>{
    beforeEach(async({page})=>{
        await page.goto("http://localhost:5173")
    })

    test('login form renders', async({page})=>{
       let username = page.getByLabel('username');
       let password =  page.getByLabel('password');

       await expect(username).toBeVisible();
       await expect(password).toBeVisible();

    })
})
