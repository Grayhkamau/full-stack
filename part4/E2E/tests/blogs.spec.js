const {test, describe, beforeEach, expect} = require("@playwright/test");
const { createUser, clearDB, loginUser } = require("./blog.helper");


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

    describe('logged in', ()=>{
        test('correct details = successful login', async({page})=>{
            await loginUser(page,'hkamau','hkamau');

            await expect(page.getByText('logged in sucessfully')).toBeVisible();

        })
        test('wrong details = failed log in', async({page})=>{
            await loginUser(page,'hkamau', 'wrong');

            await expect(page.getByText('wrong username and password')).toBeVisible();
        })
        test.only('a new blog when logged in', async({page})=>{
            await loginUser(page,'hkamau','hkamau');
            
            await page.getByText('Add blogs').click();

            await page.getByLabel('Title').fill('new test blog');

            await page.getByLabel('Author').fill('Zack')

            await page.getByLabel("url").fill('https://academind.com/tutorials/localstorage-vs-cookies-xss/')

            await page.getByRole('button', {name:'create'}).click();

            await expect(page.getByText('new test blog')).toBeVisible()
        })

    })
})
