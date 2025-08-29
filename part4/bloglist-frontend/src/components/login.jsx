const LoginForm = ({ username, password, setCredentials, handleLogin }) => {
  return(
    <div>
      <form onSubmit={handleLogin}>
        <label >username
        <input type="text" value={username} name="username" onChange={(e) => setCredentials(e)}/>
        </label>
        <br />
        <label>password
        <input type="password" value={password} name="password" onChange={(e) => setCredentials(e)}/>
        </label>
        <br />
        <button>Login in</button>
      </form>
    </div>
  )
}

export default LoginForm