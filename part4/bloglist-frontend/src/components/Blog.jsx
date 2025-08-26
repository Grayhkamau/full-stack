import { useState } from "react";

const Blog = ({ blog, handleUpdateLike,user, handleRemoveBlogs }) => {
  const [showDetails,setShowDetails] = useState(false)
  
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBlogs = ()=>{
    if(!window.confirm(`remove blog ${blog.title}`)) return
    handleRemoveBlogs(blog.id)
  }
  const updateLikes = ()=>{
    handleUpdateLike(blog.id)
  }
  console.log("creator",blog.creator._id,"user", user._id)
  return(
    <div style={blogStyle}>
      <p>{blog.title} <button onClick={()=>setShowDetails(!showDetails)}>{showDetails?"hide":"view"}</button></p>
      {showDetails
      ?
        <>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button onClick={updateLikes}>like</button></p>
          <p>{blog.author}</p>
          {(blog.creator._id||blog.creator)===user._id? 
          <button 
            style={{backgroundColor:"#914342ff",borderRadius:5}} 
            onClick={removeBlogs}>Remove
          </button>
          :
          ''
          }
        </> 
      :
      ''
      }
    </div> 
  )
   
}

export default Blog