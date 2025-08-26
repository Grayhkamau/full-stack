import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/login';
import login from './services/login';
import AddBlogForm from './components/add_blog';
import Toggable from './components/Toggleable';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userInput, setUserInput] = useState({
    username:'',
    password:''
  })
 
  const [user,setUser] = useState(null);
  const [token,setToken] =  useState(null);
  const [responseMsg,setMsg] =  useState('');
  const [responseStatus,setStatus] =  useState(null)
  const toggleRef = useRef();

  const showStatus = (status,msg)=>{
        setStatus(status);
        setMsg(msg)
        setTimeout(()=>{
          setStatus(null)
          setMsg(null)
        },3000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    let userAndToken = window.localStorage.getItem('userAndToken');

    if(userAndToken){
      let {user,token} = JSON.parse(userAndToken);
      setUser(user)
      setToken(token)
    }
  },[])

  const handleChangeCredentials = (e)=>{
      setUserInput({...userInput,[e.target.name]:e.target.value})
  }

  const handleLogin = async(e)=>{
      try {
        e.preventDefault()
        let response = await login(userInput);

        window.localStorage.setItem('userAndToken',JSON.stringify(response))
        setUser(response.user)
        setToken(response.token)
        showStatus('sucess', "logged in sucessfully")

      } catch (error) {
        showStatus('error', 'wrong username and password')
      }
  }

  const handleLogOut = ()=>{
    window.localStorage.removeItem('userAndToken');
    setUser(null)
    setToken(null)
  }


const handleUpdateLike = async(blogId)=>{
    try{
      let blogUpdated = await blogService.updateLikes(token,blogId);
      setBlogs(blogs.map(blog=>blog.id===blogUpdated.id?blogUpdated:blog))
    }
    catch(error){
        showStatus('error', `error saving blog: ${error.message}`)
    }
  }

  const handleRemoveBlogs = async(blogId)=>{
    try{
      await blogService.deleteBlog(token,blogId);
      setBlogs(blogs.filter(blog=>blog.id!==blogId))
      showStatus('sucess', "blog deleted successfully")
    }
    catch(error){
        showStatus('error', `error deleting blog: ${error.message}`)
    }
  }
  const submitBlog = async(blogDetails,setBlogDetails)=>{

    if(!blogDetails.author||!blogDetails.url||!blogDetails.title) return;

    try {
      const blogSaved = await blogService.add(token,blogDetails);

      setBlogs(prev=>{return [blogSaved,...prev]})
      showStatus('sucess',`a new blog "${blogSaved.title}" by ${blogSaved.author} added`)
      setBlogDetails({title:'',author:'',url:''})
      toggleRef.current.toggleVisibility()

    } catch (error) {
      console.log('error saving blog', error)
       showStatus('error', 'error saving blog')
    }

  }
  let errorStyle ={
    border:'2px solid red',
    color:'red'
  }
  const successStyle = {
    border:'2px solid green',
    color:'green'
  }
  return (
    <div>
      {responseMsg?<h2 style={responseStatus==="sucess"?successStyle:errorStyle}>{responseMsg}</h2>:''}
      {user
      ?
        <>
          <h2>blogs</h2>

          <p>{user.name} logged in </p>
          <button type='submit' onClick={handleLogOut}>Log out</button>

                <br/>
                <br/>
                <br/>
          <Toggable reff={toggleRef}>
            <h1>Create New</h1>
            <AddBlogForm  submitBlog={submitBlog}/>
          </Toggable>
          {
            
          [...blogs].sort((a,b)=>b.likes-a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} user={user}  handleUpdateLike={handleUpdateLike} handleRemoveBlogs={handleRemoveBlogs}/>
          )}
        </>
      :
        <>
          <h2>Log in to Application</h2>
          <LoginForm username={userInput.username} password={userInput.password} setCredentials={handleChangeCredentials} handleLogin={handleLogin}/>
        </>
      }
      
    </div>
  )
}

export default App