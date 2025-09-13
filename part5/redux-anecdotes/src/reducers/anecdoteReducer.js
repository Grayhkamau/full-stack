import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes';


// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }


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

      let anecdote = state.find(anecdote=>anecdote.id===payload);

      anecdote.votes++;

      state.sort((a,b)=>b.votes-a.votes)

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
    console.log('response', anecdotes)
    dispatch(appendNotesCreator(anecdotes))
  }
}
export default anecdoteSlice.reducer;