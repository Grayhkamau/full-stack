const bcrypt =  require('bcrypt');

const hash_password = async(password)=>{
    let saltRounds =  10;

    let hashPassword = await bcrypt.hash(password, saltRounds);

    return hashPassword
}

const compare_password = async(hashed_password,password)=>{
    let result = await bcrypt.compare(password,hashed_password);

    return result
}

module.exports =  {compare_password,hash_password}