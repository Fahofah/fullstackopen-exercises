import { useState } from 'react'
import Persons from './components/Persons'
import NewPersonForm from './components/NewPersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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