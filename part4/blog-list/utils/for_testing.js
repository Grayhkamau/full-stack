const reverse =  (string)=>{
    return string.split('').reverse().join('')
}

const average =  (arr)=>{
    const reducer = (sum,item)=>{
        return sum + item
    }
    return !arr.length ? 0 : arr.reduce(reducer)/arr.length
}
module.exports = {reverse, average}