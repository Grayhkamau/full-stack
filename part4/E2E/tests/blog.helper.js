
const createUser = async(request)=>{
    await request.post('http://localhost:3001/api/users', {
        data:{
            username:'hkamau',
            password:'hkamau',
            name:'kamau'
        }
    })
}

const clearDB = async(request)=>{
    await request.post('http://localhost:3001/api/test/reset');
}

module.exports = {createUser, clearDB}