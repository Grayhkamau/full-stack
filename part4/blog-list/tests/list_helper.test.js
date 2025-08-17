const {test,describe} = require('node:test');
const assert = require('node:assert');
const {dummy,total_likes, favouriteBlog} =  require('../utils/list_helper');


test('dummy', ()=>{
    assert.strictEqual(dummy([]), 1)
})

describe('total likes', ()=>{
    test('of empty blogs is zero', ()=>{

        let blog_list = []

        assert.strictEqual(total_likes(blog_list),0)
    })

    test('when list has one blog equals the likes of that', ()=>{
        let blog_list = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }]
        assert.strictEqual(total_likes(blog_list),blog_list[0].likes)
    })

    test('of a bigger list is calculated right', ()=>{

        let blog_list = [{
                            _id: '5a422aa71b54a676234d17f8',
                            title: 'Go To Statement Considered Harmful',
                            author: 'Edsger W. Dijkstra',
                            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                            likes: 5,
                            __v: 0
                        },
                        {
                            _id: '5a422aa71b54a676234d17f8',
                            title: 'Go To Statement Considered Harmful',
                            author: 'Edsger W. Dijkstra',
                            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                            likes: 5,
                            __v: 0
                        },
                        {
                            _id: '5a422aa71b54a676234d17f8',
                            title: 'Go To Statement Considered Harmful',
                            author: 'Edsger W. Dijkstra',
                            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                            likes: 5,
                            __v: 0
                        }]
        assert.strictEqual(total_likes(blog_list), 15)
                        
    })
})


describe("favourite blog", ()=>{
    test('of empty blogs is zero', ()=>{
        let blog_list = []
        assert.strictEqual(favouriteBlog(blog_list),0)
    })
    test('when list has one blog equals that blog', ()=>{
        let blog_list = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }]

        assert.deepStrictEqual(favouriteBlog(blog_list),blog_list[0])
    })
     test('of a bigger list favourite is calculated right', ()=>{
        let blog_list = [{
                            _id: '5a422aa71b54a676234d17f8',
                            title: 'Go To Statement Considered Harmful',
                            author: 'Edsger W. Dijkstra',
                            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                            likes: 10,
                            __v: 0
                        },
                        {
                            _id: '5a422aa71b54a676234d17f8',
                            title: 'Go To Statement Considered Harmful',
                            author: 'Edsger W. Dijkstra',
                            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                            likes: 5,
                            __v: 0
                        },
                        {
                            _id: '5a422aa71b54a676234d17f8',
                            title: 'Go To Statement Considered Harmful',
                            author: 'Edsger W. Dijkstra',
                            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                            likes: 25,
                            __v: 0
                        }]
        assert.deepStrictEqual(favouriteBlog(blog_list),blog_list[blog_list.length-1])
    })
})