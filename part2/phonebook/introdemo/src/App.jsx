import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from './components/Persons'
import NewPersonForm from './components/NewPersonForm'
import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  

  useEffect(() => {
    personsService.getAll()
      .then(currentPhonebook => {
        setPersons(currentPhonebook)
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

   const updateNumber = (name) => {
    const existingPerson = persons.find(person => person.name === name);
    const updatedNumber = { ...existingPerson, number: newNumber };

    personsService.update(existingPerson.id, updatedNumber)
    .then(updatedPerson => {
      setPersons(persons.map(p => 
        p.id !== existingPerson.id ? p : updatedPerson
      ))
    })
    .catch(error => {
      console.error('Error updating number:', error);
      alert(`Failed to update ${name}. Please try again.`);
    })
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    
    const cleanedName = newName.trim()

    if (persons.some(person => person.name === cleanedName)) {
      const replace = confirm(`${newName} is already in the phonebook, do you want to replace the old number with a new one?`)
      if (replace) {
        updateNumber(cleanedName)
      }
    }
    else {
      const newPersonObject = {
        name: cleanedName,
        number: newNumber
      }

      personsService.create(newPersonObject)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
      })
      .catch(error => {
        console.error('Error adding new person:', error);
        alert(`Failed to add ${newName}. Please try again.`);
      });
    }

    setNewName('') 
    setNewNumber('') 

  }

  const deletePerson = (event, person) => {
    event.preventDefault()

    const deleteConfirmed = confirm(`Delete ${person.name}?`) 

    if (deleteConfirmed) {
      personsService.remove(person.id)
      .then((deletePerson) => {
        console.log(`Deleted ${deletePerson.name}`);
        setPersons(persons.filter(p => p.id !== person.id))
      })
      .catch(error => {
        console.error(`Error deleting ${person.name}:`, error);
        alert(`Information of ${person.name} has already been removed from the server`);
        setPersons(persons.filter(p => p.id !== person.id)) 
      });
    }
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
      <Persons persons={persons} filter={newFilter} deletePerson={deletePerson} />
    </div>
    
  )
}

export default App