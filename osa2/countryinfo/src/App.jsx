import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weatherData, setWeatherData] = useState(null)
  const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
      .then(response => {
        console.log("weather data should be received")
        console.log(response.data)
        setWeatherData(response.data)
      })
  }, [])

  if (weatherData) {
    const icon_url = `https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`
    return(
      <div>
        <h1>Weather in {capital}</h1>
        <p>Temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celsius</p>
        <img src={icon_url}/>
        <p>Wind {weatherData.wind.speed} m/s</p>
      </div>
    )
  }
  else {
    return(
      <div></div>
    )
  }
}

const CountriesList = ({countries, setFilterValue}) => {
  return(
    countries
      .map((country) =>
      <div key={country.cca2}>
        {country.name.common}
        <button onClick={() => {setFilterValue(country.name.common)}}>
          Show
        </button>
      </div>)
    )
}

const Countries = ( {countries, filterValue, setFilterValue} ) => {
  if (countries.length > 10 && filterValue) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length < 10 && countries.length > 1) {
    // compare length of country.name.common and FilterValue, to get exact match
    const filteredByLength = countries.filter((country) => country.name.common.length === filterValue.length)
    if (filteredByLength.length === 1) {
    const country = filteredByLength[0]
    return (
      <div>
        <Country country={country} key={country.cca2}/>
      </div>
    )
    }
    else {
    return (
      <CountriesList countries={countries} setFilterValue={setFilterValue}/>
    )
    }
  } else if (countries.length == 1){
    return (
      countries
      .map((country) =>
        <Country country={country} key={country.cca2}/>
      ))
  } else {
    return (
      <div></div>
    )
  }
}

const Country = ({country}) => {
  console.log(country)
  console.log(Object.entries(country.languages))
  return (
    <div>
      <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>
      <h1>Languages</h1>
      <ul>
        {Object.entries(country.languages).map((language, key) =>
          <li key={language}>
            {language[1]}
          </li>
        )}
      </ul>
      <img src={country.flags.png}/>
      <Weather capital={country.capital}/>
    </div>
    
  )
}

const App = () => {
  const [filterValue, setFilterValue] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  useEffect(() => {
    setFilteredCountries(
    countries
      .filter((country) => country.name.common.toLowerCase().includes(filterValue.toLowerCase()))
    )
    console.log(filteredCountries)
  }, [filterValue])

  const handleChange = (event) => {
    setFilterValue(event.target.value)
  }

  return(
    <div>
      <form>
        find countries <input value={filterValue} onChange={handleChange} />
      </form>
      <Countries countries={filteredCountries} filterValue={filterValue} setFilterValue={setFilterValue}/>
    </div>
  )
}

export default App
