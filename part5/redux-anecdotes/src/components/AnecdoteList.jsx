import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notificationHelper } from "../reducers/notificationReducer"

const AnecdoteList = ()=>{
    const dispatch = useDispatch()
    // console.log(useSelector(state=>state.filter === 'ALL' ? state.anecdotes:state.anecdotes.filter(anecdote=>anecdote.content.includes(state.filter))))
    const state = useSelector(state=>state)

    console.log(useSelector(state=>state))
    let anecdotes = state.filter==='ALL' ? state.anecdotes : state.anecdotes.filter(anecdote=>anecdote.content.includes(state.filter))

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(notificationHelper(`voted for: "${anecdote.content}"`, 5000))
    }

    return(
        <div>
            {anecdotes.map((anecdote)=>{
                return(
                    <div key={anecdote.id} style={{marginBottom:'10px'}}>
                        <span>{anecdote.content}</span>
                        <span>   has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                        </span>
                    </div> 
                )
            })} 
        </div>
    )
}

export default AnecdoteList