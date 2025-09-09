import { useDispatch, useSelector } from "react-redux"
import { voteCreator } from "../reducers/anecdoteReducer"

const AnecdoteList = ()=>{
    const dispatch = useDispatch()
    const anecdotes = useSelector(state=>state)

    const vote = (id) => {
        dispatch(voteCreator(id))
    }

    return(
        <div>
            {anecdotes.map((anecdote)=>{
                return(
                    <>
                        <div>{anecdote.content}</div>
                        <div>has {anecdote.votes}
                        <   button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </> 
                )
            })} 
        </div>
    )
}

export default AnecdoteList