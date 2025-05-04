import axios from 'axios';
// const baseUrl = "http://localhost:3001"
const getAll = ()=>{
    let request = axios.get(`/api/persons`);

    return request.then(response=>response.data)
}

const create = (person)=>{
    let request = axios.post(`/api/persons`, person)

    return request.then(response=>response.data)
}

const deleteUser = (personID)=>{
    let request = axios.delete(`/api/persons/${personID}`)

    return request.then(response=>response.data);
}

const update = (personID, updates)=>{
    let request = axios.put(`/api/persons/${personID}`,updates);

    return request.then(response=>response.data)
}       

export default {getAll, create, deleteUser, update}