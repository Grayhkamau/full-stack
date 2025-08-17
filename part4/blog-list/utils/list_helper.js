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
    

const mostBlogs = (blogs)=>{
    
    if(!blogs.length) return 0;

    let authorsAndBlogsReducer = (authorsAndBlogsArray, blog)=>{
        let authorAndBlogInArr = authorsAndBlogsArray.find(authorAndBlog=>authorAndBlog.author === blog.author)
        if(authorAndBlogInArr) {
            authorAndBlogInArr.blogs++
            return authorsAndBlogsArray
        }
        authorsAndBlogsArray.push({author:blog.author,blogs:1})
        return authorsAndBlogsArray
    }

    let authorsAndBlogs = blogs.reduce(authorsAndBlogsReducer, []);

    let mostBlogsReducer = (topAuthor, currentAuthor)=>{
        if(topAuthor.blogs>currentAuthor.blogs) return topAuthor

        return currentAuthor
    }

    return authorsAndBlogs.reduce(mostBlogsReducer,authorsAndBlogs[0]) 
}
module.exports = {dummy,total_likes, favouriteBlog, mostBlogs};