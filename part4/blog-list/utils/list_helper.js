const dummy = (arr)=>{
    return 1
}

const total_likes = (blogs)=>{

        let reducer = (sum, blog)=>{
                return sum+blog.likes
        }
        return blogs.length===0 ? 0 : blogs.reduce(reducer,0)
   
}

const favouriteBlog = (blogs)=>{
    let reducer = (previousBlog,currentBlog)=>{
        if (previousBlog.likes>currentBlog.likes) return previousBlog
        return currentBlog
    }
    
    return !blogs.length ? 0 : blogs.reduce(reducer,blogs[0])
}
    

module.exports = {dummy,total_likes, favouriteBlog};