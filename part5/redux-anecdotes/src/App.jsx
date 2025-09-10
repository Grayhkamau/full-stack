import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterForm from './components/filterForm';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterForm/>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm/>
    </div>
  )
}


export default App