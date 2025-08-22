const {test, after, beforeEach,describe, before} = require('node:test');
const assert = require('assert');
const supertest =  require('supertest')
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blogs');
const User = require('../models/users');
const { blogsInDB, blog_list, saveBlog, login } = require('./blog_list_api._helper');
const { hash_password } = require('../utils/encrypt_password');
const api =  supertest(app);

let saveUser = async()=>{

    let hashPassword = await hash_password('hsjdshjds')

        let user= {
            username:"hkamau",
            hashPassword,
            name:'kamau'
        }

        let userObj = new User(user);

        await userObj.save()
        console.log('saving user first')

}



describe('when there is initially some notes saved',async()=>{
   
    
    beforeEach(async()=>{
        await Blog.deleteMany({});
        await User.deleteMany({});
        await saveUser();

        let {id} = await login();


        let blogObjects = blog_list.map(blog=>{
            blog.creator = id;

            return new Blog(blog)
            
        })
        let blogSavePromiseArray = blogObjects.map(blog=>blog.save())

        await Promise.all(blogSavePromiseArray);
    })

    describe.only("blogs returned", ()=>{
        test.only('correct amount of blogs returned', async()=>{
            let response =  await blogsInDB()

            assert.strictEqual(response.length,blog_list.length)
        })

        test('blogs returned with id property', async()=>{
            let response = await blogsInDB()

            let blogKeys = Object.keys(response[0])

            assert(blogKeys.includes('id'))
        })
    })
    describe("saving blogs", ()=>{
        test('saved blog successfully', async()=>{
            let blogsBefore = await blogsInDB();
            let blog = {
                        title: 'The first blog',
                        author: 'John Doe',
                        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                        likes: 5,
                    }
            let {token} = await login()
            
            await saveBlog(blog,token)

            let blogsAfter =  await blogsInDB()

            let titles = blogsAfter.map(blog=>blog.title);

            assert(titles.includes(blog.title))

            assert.strictEqual(blogsAfter.length,blogsBefore.length+1);
        })

        test('missing likes field defaults to 0', async()=>{
            let blog = {
                        title: 'The first blog',
                        author: 'John Doe',
                        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
                    }
            let {token} = await login()
            
            await saveBlog(blog,token)
            let response =  await blogsInDB()

            assert.strictEqual(response[response.length-1].likes,0)
        })
        test('missing title or author is handled properly', async()=>{

            let blog = {
                        title: 'The first blog',
                        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
                    }
            
            let {token} = await login()

            await api
            .post('/api/blogs')
            .set('Authorization',`Bearer ${token}`)
            .send(blog)
            .expect(400)

            delete blog.title

            blog.author = "John Doe"

            await api
            .post('/api/blogs')
            .set('Authorization',`Bearer ${token}`)
            .send(blog)
            .expect(400)

        })

    })
    describe("deleting a blog", ()=>{
        test('deleting a blog', async()=>{
            let blog = {
                        title: 'The first blog',
                        author: 'John Doe',
                        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
                    }

            let {token} = await login()

            const response = await saveBlog(blog,token)

            await api
            .delete(`/api/blogs/${response}`)
            .set('Authorization',`Bearer ${token}`)
            .expect(204)
        })
    })
    describe('update blogs', ()=>{
        test.only('update likes', async()=>{
            let blog = {
                        title: 'The first blog',
                        author: 'John Doe',
                        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                        likes:0
                    }

            let {id,token} = await login()

            blog.creator =  id;

            let blogObject = new Blog(blog)

            const blogBeforeUpdate = await blogObject.save()

            const blogAfterUpdate = await api
            .put(`/api/blogs/${blogBeforeUpdate._id.toString()}`)
            .set('Authorization',`Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            assert.strictEqual(blogBeforeUpdate.likes+1,blogAfterUpdate.body.likes)
        })
    })
})





after(async()=>{
    await User.deleteMany({});
    await Blog.deleteMany({})
    await mongoose.connection.close()
})