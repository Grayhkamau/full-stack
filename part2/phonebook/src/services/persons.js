import axios from 'axios';

const getAll = ()=>{
    let request = axios.get("http://localhost:3001/persons");

    return request.then(response=>response.data)
}

const create = (person)=>{
    let request = axios.post("http://localhost:3001/persons", person)

    return request.then(response=>response.data)
}

const deleteUser = (personID)=>{
    let request = axios.delete(`http://localhost:3001/persons/${personID}`)

    return request.then(response=>response.data);
}

const update = (personID, updates)=>{
    let request = axios.put(`http://localhost:3001/persons/${personID}`,updates);

    return request.then(response=>response.data)
}       

export default {getAll, create, deleteUser, update}