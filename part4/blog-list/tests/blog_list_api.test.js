const {test, after, beforeEach} = require('node:test');
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


beforeEach(async()=>{
    await Blog.deleteMany({})

    const blogObjects = blog_list.map(blog=>new Blog(blog))

    const blogPromiseArray =  blogObjects.map(async (object)=>{await object.save()})

    await Promise.all(blogPromiseArray)
})


test('correct amount of blogs returned', async()=>{
    let response =  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length,blog_list.length)
})

after(async()=>{await mongoose.connection.close()})