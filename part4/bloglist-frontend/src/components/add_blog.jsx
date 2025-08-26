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
    submitBlog(blogDetails,setBlogDetails)
  }
  return(
    <div>
      <form onSubmit={handleBlogSubmit}>
        <label htmlFor="title">Title</label>;
        <br/>
        <input type="text" name="title" value={blogDetails.title} onChange={(e) => handleBlogFormChange(e)}/>
        <br/>
        <label htmlFor="author">Author</label>;
        <br/>
        <input type="text" name="author" value={blogDetails.author} onChange={(e) => handleBlogFormChange(e)}/>
        <br/>
        <label htmlFor="url">URL</label>;
        <br/>
        <input type="text" name="url" value={blogDetails.url} onChange={(e) => handleBlogFormChange(e)}/>
        <br/>
        <input type="submit" value={'submit'}/>
      </form>
    </div>
  )
}

export default AddBlogForm