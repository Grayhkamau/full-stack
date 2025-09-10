import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducers from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdotes:reducers.anecdoteReducer,
  filter:reducers.filterReducer
})
const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
const showState = ()=> console.log(store.getState())
store.subscribe(showState)