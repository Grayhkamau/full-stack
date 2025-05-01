const FilterForm = ({country, handleChangeCountryFilter})=>{
    return(
        <p>Find countries   <input type="text" value={country} onChange={handleChangeCountryFilter}/></p> 
    )

}


export default FilterForm