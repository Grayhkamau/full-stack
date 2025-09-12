import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterForm from './components/filterForm';
import Notification from './components/Notification';
import { appendNotesCreator } from './reducers/anecdoteReducer';
import anecdoteServices from './services/anecdotes';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    anecdoteServices.getAll().then(data=>{
      console.log(data)
      dispatch(appendNotesCreator(data))
    })
  
  },[])
  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <FilterForm/>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}


export default App