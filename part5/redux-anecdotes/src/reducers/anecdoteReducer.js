import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name:"anecdote",
  initialState:[],
  reducers:{
    addAnecdoteCreator(state,action){
      let {payload} = action;
      state.push(payload)
    },
    voteCreator(state,action){
      let {payload} = action;

      let newAnecdotes = state.map(anecdote=>anecdote.id!==payload.id ? anecdote : payload);

      return newAnecdotes.sort((a,b)=>b.votes-a.votes)

    },
    appendNotesCreator(state,action){
      return action.payload;
    }
  }
})



export const {addAnecdoteCreator,voteCreator,appendNotesCreator} = anecdoteSlice.actions;

export const initializeAnecdotes = ()=>{
  return async(dispatch)=>{
    let anecdotes = await anecdotesService.getAll()
    dispatch(appendNotesCreator(anecdotes))
  }
}

export const addAnecdote = (content)=>{
  return async(dispatch)=>{
    let anecdote = await anecdotesService.add(content)
    console.log('response', anecdote)

    dispatch(addAnecdoteCreator(anecdote))
  }
}

export const voteAnecdote = (anecdote)=>{
  return async(dispatch)=>{
    let anecdoteVoted = await anecdotesService.vote(anecdote);

    dispatch(voteCreator(anecdoteVoted))
    
  }
}
export default anecdoteSlice.reducer;