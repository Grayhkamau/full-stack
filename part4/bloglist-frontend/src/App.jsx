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

  return (
    <div>
      {user?
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in </p>
          <button type='submit' onClick={handleLogOut}>Log out</button>
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