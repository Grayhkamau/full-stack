import { Link } from "react-router-dom";

const AnecdoteList = ({anecdotes})=>{

    return(
    <div>
        <h2>Anecdotes</h2>
        <ul>
        {anecdotes.map(anecdote => <div><Link to={`/anecdotes/${anecdote.id}`} key={anecdote.id} >{anecdote.content}</Link></div>)}
        </ul>
    </div>
    )
}

export default AnecdoteList;