import axios from 'axios';
let baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async()=>{
    let response = await axios.get(baseUrl)
    console.log('this is the response', response)
    return response.data
}

export const add = async(content)=>{
    let response = await axios.post(baseUrl,{content,votes:0})

    return response.data
}

export const vote = async(anecdote)=>{
    let response = await axios.put(`${baseUrl}/${anecdote.id}`,{...anecdote, votes:anecdote.votes+1})
    return response.data;
}