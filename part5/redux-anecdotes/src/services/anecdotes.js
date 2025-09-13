import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async()=>{
    let response = await axios.get(baseUrl);

    return response.data;
}

const add = async(content)=>{
    let response = await axios.post(baseUrl,{content,important:Math.random()>4, votes:0})
console.log(response.data)
    return response.data;
}

const vote = async(anecdote)=>{
    let response = await axios.put(`${baseUrl}/${anecdote.id}`,{...anecdote,votes:anecdote.votes+1});

    console.log('response for vote', response.data)
    return response.data;
}
export default {getAll,add,vote};