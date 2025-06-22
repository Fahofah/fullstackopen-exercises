import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import NewPersonForm from './components/NewPersonForm'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const personsUrl = 'http://localhost:3001/persons'

  useEffect(() => {
    console.log('effect')
    axios
      .get(personsUrl)
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
    }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

   const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
  
    const newId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) + 1 : 1;

    const newPersonObject = {
      name: newName,
      number: newNumber,
      id: newId
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat(newPersonObject))
    setNewName('') 
    setNewNumber('') 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange}/>
      </div>
      <NewPersonForm 
        onSubmit={addNewPerson} 
        nameValue={newName}
        numberValue={newNumber}
        nameChangeHandler={handleNameChange} 
        numberChangeHandler={handleNumberChange}
      />
      <Persons persons={persons} filter={newFilter} />
    </div>
    
  )
}

export default App