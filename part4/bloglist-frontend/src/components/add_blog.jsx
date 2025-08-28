import { useState } from 'react'
const AddBlogForm = ({ submitBlog }) => {

  const [blogDetails,setBlogDetails] = useState({
    title:'',author:'',url:''
  })
  const handleBlogFormChange = (e) => {
    setBlogDetails((prev) => {return { ...prev,[e.target.name]:e.target.value }})
  }

  const handleBlogSubmit = (e) => {
    e.preventDefault()
    submitBlog(blogDetails)
    
    setBlogDetails({ title:'',author:'',url:'' })
  }
  return(
    <div>
      <form onSubmit={handleBlogSubmit}>
        <label htmlFor="title">Title</label>;
        <br/>
        <input type="text" placeholder="title" name='title' value={blogDetails.title} onChange={(e) => handleBlogFormChange(e)}/>
        <br/>
        <label htmlFor="author">Author</label>;
        <br/>
        <input type="text" placeholder="author" name="author" value={blogDetails.author} onChange={(e) => handleBlogFormChange(e)}/>
        <br/>
        <label htmlFor="url">URL</label>;
        <br/>
        <input type="text" placeholder="url" name="url" value={blogDetails.url} onChange={(e) => handleBlogFormChange(e)}/>
        <br/>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default AddBlogForm