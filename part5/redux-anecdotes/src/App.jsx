import { useSelector, useDispatch } from 'react-redux'
import { voteCreator } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
const App = () => {
  const anecdotes = useSelector(state => state)
 

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}

export default App