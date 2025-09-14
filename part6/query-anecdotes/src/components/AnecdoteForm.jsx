import { useMutation, useQueryClient } from "@tanstack/react-query"
import { add } from "../services/anecdotes"

const AnecdoteForm = () => {
  let client = useQueryClient()
  
  let addAnecdoteMutation = useMutation({
    mutationFn:add,

    onSuccess:(anecdote)=>{
      // await client.invalidateQueries('anecdotes')
      // console.log('current query data',client.getQueryData(['anecdotes']))
      client.setQueryData(['anecdotes'],[...client.getQueryData(['anecdotes']),anecdote])
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
