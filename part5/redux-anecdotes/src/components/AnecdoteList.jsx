import { useDispatch, useSelector } from "react-redux"
import { voteCreator } from "../reducers/anecdoteReducer"
import { createNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = ()=>{
    const dispatch = useDispatch()
    // console.log(useSelector(state=>state.filter === 'ALL' ? state.anecdotes:state.anecdotes.filter(anecdote=>anecdote.content.includes(state.filter))))
    const state = useSelector(state=>state)

    console.log(useSelector(state=>state))
    let anecdotes = state.filter==='ALL' ? state.anecdotes : state.anecdotes.filter(anecdote=>anecdote.content.includes(state.filter))

    const vote = (id) => {
        dispatch(voteCreator(id))
        dispatch(createNotification(`anecdote with id: ${id} liked`))
        setTimeout(()=>{
            dispatch(removeNotification(''))
        },5000)
    }

    return(
        <div>
            {anecdotes.map((anecdote)=>{
                return(
                    <div key={anecdote.id} style={{marginBottom:'10px'}}>
                        <span>{anecdote.content}</span>
                        <span>   has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                        </span>
                    </div> 
                )
            })} 
        </div>
    )
}

export default AnecdoteList