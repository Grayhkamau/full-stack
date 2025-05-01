import axios from "axios";

const weatherKey = import.meta.env.VITE_weather_key;
const getWeather = (capital,country)=>{
    let request = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital},${country}&APPID=${weatherKey}`)
    return request.then(response=>{
    return  response.data
    });
}
export default {getWeather}