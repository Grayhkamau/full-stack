const {test, after, beforeEach,describe} = require('node:test');
const assert = require('assert');
const supertest =  require('supertest')
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blogs');
const api =  supertest(app);

const blog_list = [{
                    title: 'Go To Statement Considered Harmful',
                    author: 'Edsger W. Dijkstra',
                    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                    likes: 5,
                },
                {
                    title: 'Go To Statement Considered Harmful',
                    author: 'Edsger W. Dijkstra',
                    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                    likes: 5,
                },
                {
                    title: 'Go To Statement Considered Harmful',
                    author: 'Edsger W. Dijkstra',
                    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                    likes: 5,
}]


describe('when there is initially some notes saved',()=>{
    beforeEach(async()=>{
        await Blog.deleteMany({})

        const blogObjects = blog_list.map(blog=>new Blog(blog))

        const blogPromiseArray =  blogObjects.map(object=>object.save())

        await Promise.all(blogPromiseArray)
    })

    describe("blog returned", ()=>{
        test('correct amount of blogs returned', async()=>{
            let response =  await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

            assert.strictEqual(response.body.length,blog_list.length)
        })

        test('blogs returned with id property', async()=>{
            let response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type',/application\/json/)

            let blogKeys = Object.keys(response.body[0])

            assert(blogKeys.includes('id'))
        })
    })
    describe("saving blogs", ()=>{
        test('saved blog successfully', async()=>{
            let blogsBefore = await api.get('/api/blogs');
            let blog = {
                        title: 'The first blog',
                        author: 'John Doe',
                        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                        likes: 5,
                    }

            await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

            let blogsAfter =  await api.get('/api/blogs')

            let titles = blogsAfter.body.map(blog=>blog.title);

            assert(titles.includes(blog.title))

            assert.strictEqual(blogsAfter.body.length,blogsBefore.body.length+1);
        })

        test('missing likes field defaults to 0', async()=>{
            let blog = {
                        title: 'The first blog',
                        author: 'John Doe',
                        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
                    }
            
            await api
            .post('/api/blogs')
            .send(blog)
            
            let response =  await api.get('/api/blogs')

            assert.strictEqual(response.body[response.body.length-1].likes,0)
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
        test.only('deleting a blog', async()=>{
            let blog = {
                        title: 'The first blog',
                        author: 'John Doe',
                        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf'
                    }

            const response = await api
            .post('/api/blogs')
            .send(blog)

            await api
            .delete(`/api/blogs/${response.body.id}`)
            .expect(204)
        })
    })
})





after(async()=>{await mongoose.connection.close()})