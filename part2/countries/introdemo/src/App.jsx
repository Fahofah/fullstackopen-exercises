import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryDetails from './components/CountryDetails';
import CountryList from './components/CountryList';

import countryServices from './services/countries'

function App() {
  const api_key = import.meta.env.VITE_WEATHER_KEY
 
  const [countryNames, setCountryNames] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryDetails, setCountryDetails] = useState({})
  const [weatherDetails, setWeatherDetails] = useState({})
  const [singleCountry, setSingleCountry] = useState(false)

  useEffect(() => {
    countryServices.getAll()
    .then(countries => {
        setCountryNames(countries.map(country => country.name.common))
      })
      .catch(error => {
        console.error('Error fetching country names:', error)
      })
     }, [])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      getCountryDetails(filteredCountries[0])
    }
    else { setSingleCountry(false) }
  }, [filteredCountries])

  useEffect(() => {
  if ( countryDetails.name &&  Object.keys(weatherDetails).length > 0)  
  {
    setSingleCountry(true);
  } else {
    setSingleCountry(false);
  }
}, [countryDetails, weatherDetails]);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

    setFilteredCountries(countryNames.filter(name => 
      name.toLowerCase().includes(event.target.value.toLowerCase()))
    )
  }

  const getCountryDetails = (name) => {
    console.log('Fetching details for:', name)
    countryServices.getDetails(name)
      .then(countryDetails => {
        setCountryDetails(countryDetails)
        getWeather(countryDetails.capital)
      })
      .catch(error => {
        console.error('Error fetching country details:', error)
        setCountryDetails('')
      })
  }

  const getWeather = (capital) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
    axios.get(weatherUrl)
      .then(response => setWeatherDetails(response.data))
      .catch(error => {
        console.error('Error fetching weather data:', error)
      })
  }


  let content = null

  if (singleCountry) {
    content = <CountryDetails country={countryDetails} weather={weatherDetails} />
  } else if (newFilter === '' || filteredCountries.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  } else if (filteredCountries.length === 0) {
    content = <p>No countries found</p>
  } else {
    content = <CountryList countries={filteredCountries} getDetails={getCountryDetails} />  
  }

  return (
    <div>
      <h1>Countries</h1>
      <div>
        filter <input value={newFilter} onChange={handleFilterChange} />
      </div>
      {content}
    </div>
  )

}

export default App
