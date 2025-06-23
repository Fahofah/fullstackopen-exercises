// CountryList.jsx
const CountryList = ({ countries, getDetails }) => (
  <ul>
    {countries.map((name, id) => <p key={id}>{name} <button onClick={() => getDetails(name)} >details</button></p>)}
  </ul>
)

export default CountryList