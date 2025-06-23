// CountryDetails.jsx
const CountryDetails = ({ country, weather }) => {
  if (!country) return null
  return (
    <div>
      <h2>{country.name.common} </h2>
      <p>Capital: {country.capital}, Continent: {country.continents[0]}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Timezone: {country.timezones[0]}</p>
      <img src={country.flags.png} />
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Humidity: {weather.main.humidity} %</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <p>Wind speed: {weather.wind.speed} metre/sec</p>
    </div>
  )
}

export default CountryDetails