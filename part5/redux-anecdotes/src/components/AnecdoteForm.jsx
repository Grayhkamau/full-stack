import { useDispatch } from "react-redux";;
import { addAnecdoteCreator } from "../reducers/anecdoteReducer";
import { createNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ()=>{
    const dispatch = useDispatch();
    const addNote = (e)=>{
    e.preventDefault();

    dispatch(addAnecdoteCreator(e.target.anecdote.value))
    dispatch(createNotification(`anecdote "${e.target.anecdote.value}" created`))

    e.target.anecdote.value = '';

    setTimeout(()=>{
        dispatch(removeNotification(''))
    },5000)
  }
    return(
        <form onSubmit={addNote}>
            <div><input type='text' name='anecdote'/></div>
            <button>create</button>
        </form>
    )
}


export default AnecdoteForm