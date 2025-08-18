const supertest =  require('supertest')
const app = require('../app');
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



const blogsInDB = async()=>{
        let response =  await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        return response.body
}

const saveBlog = async(blog)=>{
        const response = await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        return response.body
}

module.exports = {blogsInDB,blog_list, saveBlog}