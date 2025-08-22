import axios from 'axios';
const baseurl = '/api/login';

const login = async(credentials)=>{

    let response = await axios.post(baseurl,credentials);

    console.log(response);

    return response.data
}

export default login