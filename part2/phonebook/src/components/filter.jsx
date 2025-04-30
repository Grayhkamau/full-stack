const Filter = ({filter,handleFilter})=>{
    return(
        <p>filter shown with <input value={filter} onChange={handleFilter} type="text"/></p>
    )
}

export default Filter