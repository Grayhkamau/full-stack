import { useQueryClient,useMutation } from "@tanstack/react-query";
import { vote } from "../services/anecdotes";
import { useReturnNotificationDispatch } from "../context";

const AnecdoteList = ()=>{
    const client = useQueryClient()
    const notificationDispatch = useReturnNotificationDispatch();

    const voteMutation = useMutation({
        mutationFn:vote,

        onSuccess: async(anecdoteVoteFor)=>{
            let currentAnecdotes = client.getQueryData(['anecdotes']);

            let newAnecdotes = currentAnecdotes.map(anecdote=>anecdote.id!==anecdoteVoteFor.id ? anecdote: {...anecdote, votes:anecdote.votes+1})

            client.setQueryData(['anecdotes'], newAnecdotes.sort((a,b)=>b.votes-a.votes))

            
            notificationDispatch({type:'notify', payload:`anecdote: "${anecdoteVoteFor.content}" liked`})

            setTimeout(()=>notificationDispatch({type:''}),5000)

        }
    })
    

    const handleVote = (anecdote) => {
        voteMutation.mutate(anecdote)
    }

    let anecdotes = client.getQueryData(['anecdotes'])
    return(
        <div>
        {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
                </div>
        )}
        </div>
    )
}

export default AnecdoteList;