import { useEffect, useState } from "react";
import countryService from './services/countries';
import weatherService from './services/weather';
import Manycountries from "./components/manyCountries";
import Country from "./components/country";
import FilterForm from "./components/filterForm";

const App = ()=>{
  const [country,setCountry] = useState('')
  const [responseCountries, setResponseCountries] = useState([])
  let [specificCountry,setSpecificCountry] = useState('');
  let [notification,setNotification] = useState('');
  let [weather,setWeather] = useState('')
  useEffect(()=>{
      console.log('reaching effect')

      setNotification('')
      setWeather('')
      setSpecificCountry('')
      setResponseCountries([])
      if(!country) return;

      countryService.getCountry(country)
      .then(
        response=>{
          console.log('searching specific country');
          setSpecificCountry(response)
          console.log('specific country response ', response);
          weatherService.getWeather(response.capital,response.altSpellings[0])
          .then(weatherResponse=>{setWeather(weatherResponse)})
          .catch(error=>{throw new Error(error.message)})
        })
      .catch(error=>{
        console.log('searching allcountries')
        countryService
          .getALL()
          .then(response=>{
            console.log('all countries response ', response);
            
            setNotification('');
            let matchingCountries = response.filter(currentCountry=>currentCountry.name.common.toLowerCase().includes(country))

            if(matchingCountries.length===1){
              setSpecificCountry(matchingCountries[0])
              weatherService
                      .getWeather(response.capital,response.altSpellings[0])
                      .then(weatherResponse=>{setWeather(weatherResponse)})
                      .catch(error=>{throw new Error(error.message)})
            }
            else{
              setResponseCountries(matchingCountries.length>10?[]:matchingCountries);
            }
            
            matchingCountries.length>10?setNotification('too many matches specify another filter!'):''
            
          })
          .catch(error=>console.log('no country with such name'))
      })
      
  },[country])


  const handleChangeCountryFilter = (e)=>{
    setCountry(e.target.value)
  }
  
  const handleShowCountry = (specificCountry)=>{
    setCountry(specificCountry)
  }
  console.log('weather', weather)
  return(
    <div>
      <FilterForm country={country}  handleChangeCountryFilter={handleChangeCountryFilter}/>

      {notification?<p>{notification}</p>:''}
      
      <Manycountries specificCountry={specificCountry} responseCountries={responseCountries} handleShowCountry={handleShowCountry}/>

      <Country specificCountry={specificCountry} weather={weather}/>
    </div>
  )

}

export default App;