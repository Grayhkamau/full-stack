const LoginForm = ({ username, password, setCredentials, handleLogin }) => {
  return(
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">username</label>
        <input type="text" value={username} name="username" onChange={(e) => setCredentials(e)}/>
        <br/>
        <label htmlFor="username">password</label>
        <input type="password" value={password} name="password" onChange={(e) => setCredentials(e)}/>
        <br/>
        <input type="submit" value="login"/>
      </form>
    </div>
  )
}

export default LoginForm