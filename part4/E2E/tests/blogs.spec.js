const {test, describe, beforeEach, expect} = require("@playwright/test");
const { createUser, clearDB } = require("./blog.helper");


describe('Blogs App', ()=>{
    beforeEach(async({page,request})=>{
        await page.goto("http://localhost:5173")
        await clearDB(request);
        await createUser(request);
    })

    test('login form renders', async({page})=>{
       let username = page.getByLabel('username');
       let password =  page.getByLabel('password');

       await expect(username).toBeVisible();
       await expect(password).toBeVisible();

    })

    describe('logging in', ()=>{
        test('correct details = successful login', async({page})=>{
            await page.getByLabel('username').fill('hkamau');
            await page.getByLabel('password').fill('hkamau');

            await page.getByRole('button', {name:'Login in'}).click()

            await expect(page.getByText('logged in sucessfully')).toBeVisible();

        })
        test('wrong details = failed log in', async({page})=>{
            await page.getByLabel('username').fill('hkamau');
            await page.getByLabel('password').fill('wrong');

            await page.getByRole('button', {name:'Login in'}).click()

            await expect(page.getByText('wrong username and password')).toBeVisible();
        })
    })
})
