import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async() => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const add = async(token, blog)=>{
  const response = await axios.post(baseUrl, blog, {headers:{'Authorization':`Bearer ${token}`}});

  console.log('adding blog response ->', response);

  return response.data
}

const updateLikes = async(token,blogId)=>{
  console.log('this is the token->', token)
  const response = await axios.put(`${baseUrl}/${blogId}`,{},{headers:{'Authorization':`Bearer ${token}`}})   

  return response.data;
}

const deleteBlog = async(token,blogId)=>{
  await axios.delete(`${baseUrl}/${blogId}`,{headers:{'Authorization':`Bearer ${token}`}})

}

export default { getAll, add, updateLikes, deleteBlog}