const {test, describe, beforeEach, expect} = require("@playwright/test");
const { createUser, clearDB, loginUser, createBlog } = require("./blog.helper");
const { afterEach } = require("node:test");


describe('Blogs App', ()=>{
    beforeEach(async({page,request})=>{
        await page.goto("http://localhost:5173")
    
        
    })
    afterEach(async({page,request})=>{
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
        // beforeEach(async({page})=>{
        // })
        test('correct details = successful login', async({page})=>{
            await loginUser(page,'hkamau','hkamau');

            await expect(page.getByText('logged in sucessfully')).toBeVisible();

        })
        test('wrong details = failed log in', async({page})=>{
            await loginUser(page,'hkamau', 'wrong');

            await expect(page.getByText('wrong username and password')).toBeVisible();
        })
        test('a new blog when logged in', async({page})=>{
            await loginUser(page,'hkamau','hkamau');
            
            await createBlog({title:'new test blog',author:'zack',url:'https://academind.com'},page)

            await expect(page.getByText('new test blog')).toBeVisible()
        })
        test.only('a blog can be liked', async({page})=>{
            await loginUser(page,'hkamau','hkamau');

            await createBlog({title:'new test blog',author:'zack',url:'https://academind.com'},page);

            await page.getByRole('button', {name:'view'}).click()

            await page.getByRole('button', {name:'like'}).click();

            await expect(page.getByText('likes: 1')).toBeVisible()
        })

    })
})
