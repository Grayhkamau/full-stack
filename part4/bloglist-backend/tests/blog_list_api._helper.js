const supertest =  require('supertest')
const app = require('../app');
const { default: mongoose } = require('mongoose');
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
                }
            ]



const blogsInDB = async()=>{
        let response =  await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        return response.body
}


const login = async()=>{
     let userCredentials = {
            username:"hkamau",
            password:"hsjdshjds"
    }
      const loginResponse =  await api
        .post('/api/login')
        .send(userCredentials)
        .expect(200)

    return loginResponse.body
}
const saveBlog = async(blog, token)=>{     
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        return response.body.id
}

module.exports = {blogsInDB,blog_list, saveBlog,login}