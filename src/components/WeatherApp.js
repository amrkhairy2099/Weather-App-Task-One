import React, { useState } from 'react';
import { BtnSearch } from './Buttons'


function WeatherApp() {  
   const [input, setInput] = useState('');
   const [weather, setWeather] = useState('');
   const [icons, setIcons] = useState('');
   const [error, setError] = useState(true);
   const [errorMsg, setErrorMsg] = useState('');
   const [loading, setLoading] = useState(false);
   const [range, setRange] =useState('');
   
   const weatherIcons = {
      Thunderstorm:'wi wi-thunderstorm',
      rainDrizzle:'wi wi-day-sleet',
      Rain:'wi wi-day-rain',
      Snow:'wi wi-day-snow',
      Atmosphere:'wi wi-day-showers',
      Clear:'wi wi-day-sunny',
      Clouds:'wi wi-day-cloudy-high',
   }
   
   const api = {
      url: "https://api.openweathermap.org/data/2.5/",
      key: 'fe849ee723f8b273c5107a50578893cb',
   }
   
   const getInput = (e) => {
      setInput(e.target.value);
   }
   
   const getWeather = (e) => {
      e.preventDefault()
      if (input === '') {
         setError(true);
         setErrorMsg('Plz Enter Your City');
      }
      if (input !== '') {
         fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
         .then((res) => {
            setLoading(true);
            if (!res.ok) {
               throw Error('Invalied Country Name');
            }
            return res.json();
         })
         .then((data) =>{
            setWeather(data);  
            setRange(data.weather[0].id);
            setInput('')
            setError(false);
            setLoading(false);
         })
         .catch((err) => {
            setError(true);
            setErrorMsg(err.message);
            setLoading(false);
         })
      }
      if(range !== '') {   
         switch(true) {
            case range >= 200 && range <= 232:
               setIcons(weatherIcons.Thunderstorm);
            break;
            case range >= 300 && range <= 321:
               setIcons(weatherIcons.rainDrizzle);
            break;
            case range >= 500 && range <= 531:
               setIcons(weatherIcons.Rain);
            break;
            case range >= 600 && range <= 622:
               setIcons(weatherIcons.Snow);
            break;
            case range >= 701 && range <= 781:
               setIcons(weatherIcons.Atmosphere);
            break;
            case range === 800:
               setIcons(weatherIcons.Clear);
            break;
            case range >= 800 && range <= 804:
               setIcons(weatherIcons.Clouds);
            break;
            default: 
               setIcons('Un');
         }
      }
   }
   
   return (
      <div className="weather-app">
         <div className="container">
            <h1>Weather App</h1>
            <form onSubmit={getWeather}>
               <div className="form-controllr">
                  <input type="text" id="input" onChange={getInput} value={input} placeholder="Enter Country or City" autoComplete="off" 
                     required />
                  <BtnSearch/>
               </div>
            </form>
            {error ? 
               (
                  <p className={errorMsg !== '' ? 'error' : ''}>{errorMsg}</p>
               ) : (
               <div className="result">
                  <h2>{weather.sys.country} - {weather.name}</h2>
                  <i className={icons}></i>
                  <h4 className="status" >{weather.weather[0].description}</h4>
                  <p>Temp : {weather.main.temp} &deg;</p>
                  <p>Temp Max : {weather.main.temp_max} &deg;</p>
                  <p>Temp Min : {weather.main.temp_min} &deg;</p>
                  <p>Wind Deg : {weather.wind.deg} deg</p>
                  <p>Wind Speed : {weather.wind.speed} Km</p>
               </div>
            )}
            {loading && <span className="loader"></span>}
         </div>
      </div>
   );
}

export default WeatherApp;
