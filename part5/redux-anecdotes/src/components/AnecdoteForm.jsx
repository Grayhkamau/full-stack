import { useDispatch } from "react-redux";;
import { addNoteCreator } from "../reducers/anecdoteReducer";

const AnecdoteForm = ()=>{
    const dispatch = useDispatch();
    const addNote = (e)=>{
    e.preventDefault();

    dispatch(addNoteCreator(e.target.anecdote.value))
    e.target.anecdote.value = '';

  }
    return(
        <form onSubmit={addNote}>
            <div><input type='text' name='anecdote'/></div>
            <button>create</button>
        </form>
    )
}


export default AnecdoteForm