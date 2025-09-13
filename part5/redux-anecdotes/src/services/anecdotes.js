import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async()=>{
    let response = await axios.get(baseUrl);

    return response.data;
}

const add = async(content)=>{
    let response = await axios.post(baseUrl,{content,important:Math.random()>4})
console.log(response.data)
    return response.data;
}

export default {getAll,add}