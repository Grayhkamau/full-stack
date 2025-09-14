import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {  useQuery } from '@tanstack/react-query'
import { getAll } from './services/anecdotes'
import AnecdoteList from './components/AnecdoteList'
const App = () => {

  let {isLoading,isError} = useQuery({
    queryKey:['anecdotes'],
    queryFn:getAll,
    retry:1
  });

  if(isError){
    return <div>anecdotes service not available due to server issues</div>
  }
  if(isLoading){
    return <div>loading....</div>
  }
  
  return (
    <div>
      <h3>Anecdote app</h3>
  
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App
