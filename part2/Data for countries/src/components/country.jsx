const Country = ({specificCountry,weather})=>{

    if(!specificCountry) return(<></>)

    return(
        <div>
          <h1>{specificCountry.name.common}</h1>  
          <p>Capital {specificCountry.capital[0]}</p>
          <p>Area {specificCountry.area}</p>

          <h2>Languages</h2>
          {Object.values(specificCountry.languages).map((lang,index)=>{
            return(<p key={index}>{lang}</p>)
          })}
          <img src={specificCountry.flags.png}/>
          {weather?
            <>
              <h2>Weather in {specificCountry.capital}</h2>
              <p>Temperature {(weather.main.temp-273.15).toFixed(2)} Celcius</p>
              {console.log('image', `https://openweathermap.org/img/wn/${weather.weather.icon}@2x.png`)}
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
              <p>Wind {weather.wind.speed} m/s</p>
            </>:''}
        </div>
    )
}

export default Country;