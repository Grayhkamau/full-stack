const {test, after, beforeEach,describe} = require('node:test');
const assert = require('assert');
const supertest =  require('supertest')
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blogs');
const { blogsInDB, blog_list, saveBlog } = require('./blog_list_api._helper');
const api =  supertest(app);




describe('when there is initially some notes saved',()=>{
    beforeEach(async()=>{
        await Blog.deleteMany({})

        const blogObjects = blog_list.map(blog=>new Blog(blog))

        const blogPromiseArray =  blogObjects.map(object=>object.save())

        await Promise.all(blogPromiseArray)
    })

    describe("blog returned", ()=>{
        test('correct amount of blogs returned', async()=>{
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

            await saveBlog(blog)

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
            
            await saveBlog(blog)
            let response =  await blogsInDB()

            assert.strictEqual(response[response.length-1].likes,0)
        })
        test('missing title or author is handled properly', async()=>{

            let blog = {
                        title: 'The first blog',
                        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
                    }
            
            await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)

            delete blog.title

            blog.author = "John Doe"

            await api
            .post('/api/blogs')
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

            const response = await saveBlog(blog)

            await api
            .delete(`/api/blogs/${response.id}`)
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

            const blogBeforeUpdate = await saveBlog(blog)

            const blogAfterUpdate = await api
            .put(`/api/blogs/${blogBeforeUpdate.id}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            assert.strictEqual(blogBeforeUpdate.likes+1,blogAfterUpdate.body.likes)
        })
    })
})





after(async()=>{await mongoose.connection.close()})