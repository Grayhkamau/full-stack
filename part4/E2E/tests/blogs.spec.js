const {test, describe, beforeEach, expect } = require("@playwright/test");
const { createUser, clearDB, loginUser, createBlog } = require("./blog.helper");



describe('Blogs App', ()=>{
  
    // afterEach(async({page})=>{
    //     await clearDB(page);
    // })

    test('login form renders', async({page})=>{
    await page.goto("http://localhost:5173")
       let username = page.getByLabel('username');
       let password =  page.getByLabel('password');
       
       await expect(username).toBeVisible();
       await expect(password).toBeVisible();

    })
    
    describe.only('logged in', ()=>{
      
        beforeEach(async({page, request})=>{
            await clearDB(request)
            await createUser(request,{username:'hkamau',password:'hkamau',name:'kamau'})
            await page.goto("http://localhost:5173")

        })

        test('correct details = successful login',`` async({page})=>{
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

            await expect(page.getByText('new test blog', {exact:true})).toBeVisible()
        })
        test('a blog can be liked', async({page})=>{
            await loginUser(page,'hkamau','hkamau');

            await createBlog({title:'new test blog',author:'zack',url:'https://academind.com'},page);

            await page.getByRole('button', {name:'view'}).click()

            await page.getByRole('button', {name:'like'}).click();

            await expect(page.getByText('likes: 1')).toBeVisible()
        })
   
        describe('deleting a blog', async()=>{
                beforeEach(async({page})=>{
                
                    await loginUser(page, "hkamau", "hkamau");

                })
            
                test('user who creates a blog can be able to delete it', async({page})=>{

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

                test('test fails if user did not create blog', async({page,request})=>{

                    let blog={title:'new test blog',author:'zack',url:'https://academind.com'}
                    await createBlog(blog,page);

                    await page.getByRole('button', {name:'Log out'}).click();

                    await createUser(request,{username:'john',password:'jjdoe',name:'jdoee'})

                    await loginUser(page, 'john','jjdoe');
                    await page.getByRole('button', {name:'view'}).click();
                    await expect(page.getByRole('button', {name:'Remove'})).not.toBeVisible();

                    // page.on('dialog', async (dialog)=>{
                    //     expect(dialog.type()).toBe('confirm')
                    //     expect(dialog.message()).toBe(`remove blog ${blog.title}`)

                    //     await dialog.accept()
                    // })

                    // await page.getByRole('button', {name:"Remove"}).click()

                    // expect()

                })
                test('only user who added the blog can see the remove btn', async({page})=>{
                    let blog={title:'new test blog',author:'zack',url:'https://academind.com'}
                    await createBlog(blog,page);

                    await page.getByRole('button',{name:'view'}).click();

                    await expect(page.getByRole('button', {name:'Remove'})).toBeVisible()
                })

            })
     })
        
})
