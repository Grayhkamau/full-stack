import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async()=>{
    let response = await axios.get(baseUrl);

    return response.data;
}


export default getAll