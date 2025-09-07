
const createUser = async(request, user)=>{
    await request.post('http://localhost:3001/api/users', {
        data:user
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

const createBlog = async(blog,page)=>{
    await page.getByText('Add blogs').click();

    await page.getByLabel('Title').fill(blog.title);

    await page.getByLabel('Author').fill(blog.author)

    await page.getByLabel("url").fill(blog.url)

    await page.getByRole('button', {name:'create'}).click();

    await page.getByText(blog.title, {exact:true}).waitFor();
}
module.exports = {createUser, clearDB, loginUser, createBlog}