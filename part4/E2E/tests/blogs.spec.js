const {test, describe, beforeEach, expect} = require("@playwright/test");
const { createUser, clearDB, loginUser, createBlog } = require("./blog.helper");
const { afterEach } = require("node:test");


describe('Blogs App', ()=>{
    beforeEach(async({page, request})=>{
        await page.goto("http://localhost:5173")
        await createUser(page, {
            username:'hkamau',
            password:'hkamau',
            name:'kamau'
        });
    })
    afterEach(async({page,request})=>{
        await page.goto("http://localhost:5173")
        await clearDB(request);
        await createUser(page, {
            username:'hkamau',
            password:'hkamau',
            name:'kamau'
        });
        
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
        test('a new blog when logged in', async({page})=>{
            await loginUser(page,'hkamau','hkamau');
            
            await createBlog({title:'new test blog',author:'zack',url:'https://academind.com'},page)

            await expect(page.getByText('new test blog')).toBeVisible()
        })
        test('a blog can be liked', async({page})=>{
            await loginUser(page,'hkamau','hkamau');

            await createBlog({title:'new test blog',author:'zack',url:'https://academind.com'},page);

            await page.getByRole('button', {name:'view'}).click()

            await page.getByRole('button', {name:'like'}).click();

            await expect(page.getByText('likes: 1')).toBeVisible()
        })

        describe('deleting a blog', async()=>{
            // beforeEach(async({page})=>{
            // })
            test.only('user who creates a blog can be able to delete it', async({page})=>{
                await loginUser(page, "hkamau", "hkamau");

                let blog={title:'new test blog',author:'zack',url:'https://academind.com'}
                await createBlog(blog,page);
                
                await page.getByRole('button', {name:'view'}).click();

                page.on('dialog', async (dialog)=>{
                    expect(dialog.type()).toBe('confirm')
                    expect(dialog.message()).toBe(`remove blog ${blog.title}`)

                    await dialog.accept()
                })

                await page.getByRole('button', {name:'Remove'}).click()

                await expect(page.getByText('blog deleted successfully')).toBeVisible();
            })

            test.only('test fails if user did not create blog', async({page})=>{

                // let blog={title:'new test blog',author:'zack',url:'https://academind.com'}
                // await createBlog(blog,page);
                
                
                page.on('requestfinished', async ()=>{
                    await loginUser(page, 'john','jjdoe');
                    await page.getByRole('button', {name:'view'}).click();
                    expect(page.getByRole('button', {name:'Remove'})).not.toBeVisible();
                })

                await createUser(page,{username:'john',password:'jjdoe',name:'jdoee'})
                
                // page.on('dialog', async (dialog)=>{
                //     expect(dialog.type()).toBe('confirm')
                //     expect(dialog.message()).toBe(`remove blog ${blog.title}`)

                //     await dialog.accept()
                // })

                // await page.getByRole('button', {name:"Remove"}).click()

                // expect()

            })

        })
        
        
    })
})
