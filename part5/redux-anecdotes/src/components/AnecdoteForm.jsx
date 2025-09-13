import { useDispatch } from "react-redux";;
import { addAnecdote } from "../reducers/anecdoteReducer";
import { notificationHelper } from "../reducers/notificationReducer";

const AnecdoteForm = ()=>{
    const dispatch = useDispatch();
    const addNote = (e)=>{
        e.preventDefault();
        let content = e.target.anecdote.value
        dispatch(addAnecdote(content))
        e.target.anecdote.value = ''
        dispatch(notificationHelper(`created anecdote: ${content}`,5000))
    }
    return(
        <form onSubmit={addNote}>
            <div><input type='text' name='anecdote'/></div>
            <button>create</button>
        </form>
    )
}


export default AnecdoteForm