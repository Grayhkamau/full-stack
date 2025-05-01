const Manycountries = ({specificCountry,responseCountries, handleShowCountry})=>{

    if(specificCountry) return (<></>)

    {responseCountries.map((country,index)=>{
        return(
          <p key={index}>{country.name.common} <button onClick={()=>handleShowCountry(country.name.common)}>show</button></p>
        )
      })}
}

export default Manycountries;