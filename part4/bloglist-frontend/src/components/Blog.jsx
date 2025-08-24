const Blog = ({ blog }) => {
  const [showDetails,setShowDetails] = useState(false)
  
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  
  return(
    <div style={blogStyle}>
      <p>{blog.title} <button onClick={()=>setShowDetails(!showDetails)}>{showDetails?"hide":"view"}</button></p>
      {setShowDetails
      ?
        <>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button>like</button></p>
          <p>{blog.author}</p>
        </> 
      :
      ''
      }
    </div> 
  )
   
}

export default Blog