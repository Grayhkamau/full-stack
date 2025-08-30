
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
const loginUser = async(page,username,password)=>{
    await page.getByLabel('username').fill(username);
    await page.getByLabel('password').fill(password);

    await page.getByRole('button', {name:'Login in'}).click()
}

module.exports = {createUser, clearDB, loginUser}