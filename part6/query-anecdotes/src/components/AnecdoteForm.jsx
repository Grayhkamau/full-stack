import { useMutation, useQueryClient } from "@tanstack/react-query"
import { add } from "../services/anecdotes"
import { useReturnNotificationDispatch } from "../context"

const AnecdoteForm = () => {
  let client = useQueryClient()

  let dispatch = useReturnNotificationDispatch();

  let addAnecdoteMutation = useMutation({
    mutationFn:add,

    onSuccess:(anecdote)=>{
      // await client.invalidateQueries('anecdotes')
      // console.log('current query data',client.getQueryData(['anecdotes']))
      client.setQueryData(['anecdotes'],[...client.getQueryData(['anecdotes']),anecdote])
      dispatch({type:'notify',payload:`anecdote: "${anecdote.content}" created`})
      setTimeout(()=>dispatch({type:''}),5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    addAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
