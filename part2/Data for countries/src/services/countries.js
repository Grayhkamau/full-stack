import axios from 'axios';

const baseURL = 'https://studies.cs.helsinki.fi/restcountries'

const getCountry = (country)=>{
    let request = axios.get(`${baseURL}/api/name/${country}`);
    return request.then(reponse=>reponse.data);
}

const getALL = ()=>{
    let request = axios.get(`${baseURL}/api/all`)
    return request.then(response=>response.data)
}



export default {getCountry, getALL}
