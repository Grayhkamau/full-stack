
const AnecdotePage = ({anecdote,vote})=>{
   
    return(
        <div>
        <h2>{anecdote.content}</h2>

        <p>has {anecdote.votes} votes</p>
        <button onClick={()=>vote(anecdote.id)}>vote</button>

        <p>for more info see: {anecdote.info}</p>

        </div>
    )
}

export default AnecdotePage