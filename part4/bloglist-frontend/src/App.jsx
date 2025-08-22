import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/login';
import login from './services/login';
import AddBlogForm from './components/add_blog';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userInput, setUserInput] = useState({
    username:'',
    password:''
  })
  const [blogDetails,setBlogDetails] = useState({
    title:'',author:'',URL:''
  })

  const [user,setUser] = useState(null);
  const [token,setToken] =  useState(null);
  


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

      } catch (error) {
        alert('error',error.message)
      }
  }

  const handleLogOut = ()=>{
    window.localStorage.removeItem('userAndToken');
    setUser(null)
    setToken(null)
  }

  const handleBlogFormChange = (e)=>{
    setBlogDetails((prev)=>{return {...prev,[e.target.name]:e.target.value}})
  }
  const handleBlogSubmit = async(e)=>{
    e.preventDefault();

    if(!blogDetails.author||!blogDetails.URL||!blogDetails.title) return;

    try {
      const blogSaved = await blogService.add(token,blogDetails);

      setBlogs(prev=>{return [blogSaved,...prev]})

    } catch (error) {
      alert('error saving blog')
    }

  }
  return (
    <div>
      {user
      ?
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in </p>
          <button type='submit' onClick={handleLogOut}>Log out</button>
          <AddBlogForm title={blogDetails.title} author={blogDetails.author} URL={blogDetails.URL} handleBlogFormChange={handleBlogFormChange} handleBlogSubmit={handleBlogSubmit}/>
          {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
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