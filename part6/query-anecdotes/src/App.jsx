import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAll } from './services/anecdotes'
const App = () => {


  let {isLoading,data,isError} = useQuery({
    queryKey:['anecdotes'],
    queryFn:getAll,
    retry:1
  });

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  if(isError){
    return <div>anecdotes service not available due to server issues</div>
  }
  if(isLoading){
    console.log('hitting')
    return <div>loading....</div>
  }
  
  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
