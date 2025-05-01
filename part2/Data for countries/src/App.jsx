import { useEffect, useState } from "react";
import countryService from './services/countries';

const App = ()=>{
  const [country,setCountry] = useState('')
  const [responseCountries, setResponseCountries] = useState([])
  let [specificCountry,setSpecificCountry] = useState('');
  let [notification,setNotification] = useState('');

  useEffect(()=>{
      console.log('reaching effect')

      setNotification('')

      if(!country) return;

      countryService.getCountry(country)
      .then(
        response=>{
          console.log('searching specific country');
          setSpecificCountry(response)
          console.log('specific country response ', response);
          
        })
      .catch(error=>{
        console.log('searching allcountries')
        countryService
          .getALL()
          .then(response=>{
            console.log('all countries response ', response);
            
            setNotification('');
            let matchingCountries = response.filter(currentCountry=>currentCountry.name.common.toLowerCase().includes(country))

            matchingCountries.length===1?setSpecificCountry(matchingCountries[0]):setResponseCountries(matchingCountries.length>10?[]:matchingCountries);
            
            matchingCountries.length>10?setNotification('too many matches specify another filter!'):''
            
          })
          .catch(error=>console.log('no country with such name'))
      })
      
  },[country])


  const handleChangeCountryFilter = (e)=>{
    setCountry(e.target.value)
    setSpecificCountry('')
    setResponseCountries([])
  }
  
  const handleShowCountry = (specificCountry)=>{
    setCountry(specificCountry)
  }
  return(
    <div>
      <p>Find countries   <input type="text" value={country} onChange={handleChangeCountryFilter}/></p> 
      {notification?<p>{notification}</p>:''}
      {!specificCountry&&responseCountries.map((country,index)=>{
        return(
          <p key={index}>{country.name.common} <button onClick={()=>handleShowCountry(country.name.common)}>show</button></p>
        )
      })}
      {specificCountry&&
        <div>
          <h1>{specificCountry.name.common}</h1>  
          <p>Capital {specificCountry.capital[0]}</p>
          <p>Area {specificCountry.area}</p>

          <h2>Languages</h2>
          {Object.values(specificCountry.languages).map((lang,index)=>{
            return(<p key={index}>{lang}</p>)
          })}
          <img src={specificCountry.flags.png}/>
        </div>
      }
    </div>
  )

}

export default App;