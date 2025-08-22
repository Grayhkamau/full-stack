const  {test, describe, beforeEach, after} =  require('node:test');
const assert =  require('node:assert');
const supertest =  require('supertest');
const app =  require('../app');
const User =  require('../models/users');
const { hash_password } = require('../utils/encrypt_password');
const { default: mongoose } = require('mongoose');

const api =  supertest(app);


describe("creating a new user", ()=>{
    beforeEach(async()=>{
        await User.deleteMany({});

        const newUser =  new User({
            name:'John Doe',
            hashPassword: await hash_password('12345'),
            username:'jdoe'
        })
        
        await newUser.save()
    })

    test("can add a user", async()=>{
        let user = {
            name:'Kamau',
            password: '12345',
            username:'hkamau'
        }
        let response = await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.username,user.username)
    })
    test('saving duplicate users with same username causes an error', async()=>{
        let user = {
            name:'Humphrey',
            password: '12345',
            username:'humph'
        }

        await api
        .post('/api/users')
        .send(user)
        .expect(201)

        await api
        .post('/api/users')
        .send(user)
        .expect(400)
    })
     test('saving with min-length name and password causes error', async()=>{
        let user = {
            name:'Hu',
            password: '12345',
            username:'hum'
        }

        await api
        .post('/api/users')
        .send(user)
        .expect(400)

        user.name = "Humphrey"
        user.password = '12'

        await api
        .post('/api/users')
        .send(user)
        .expect(400)
    })
})


after(async()=>await mongoose.connection.close())