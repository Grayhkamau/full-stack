import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/login';
import login from './services/login';


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userInput, setUserInput] = useState({
    username:'',
    password:''
  })
  const [user,setUser] = useState(null);


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleChangeCredentials = (e)=>{
      setUserInput({...userInput,[e.target.name]:e.target.value})
  }

  const handleLogin = async(e)=>{
      try {
        e.preventDefault()
        let user = await login(userInput);

        setUser(user)

      } catch (error) {
        alert('error',error.message)
      }
  }

  return (
    <div>
      <h2>blogs</h2>
      {user?
        <>
          <p>{user.name} logged in </p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      :
        <LoginForm username={userInput.username} password={userInput.password} setCredentials={handleChangeCredentials} handleLogin={handleLogin}/>
      }
      
    </div>
  )
}

export default App