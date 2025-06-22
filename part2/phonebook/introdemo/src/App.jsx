import { useState, useEffect } from 'react'
import './index.css'

import Persons from './components/Persons'
import NewPersonForm from './components/NewPersonForm'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({message:null, type: null})

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

  const showNotification = (message, type) => {
    setNotification({message, type})
    setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 3500)
  }

   const updateNumber = (name) => {
    const existingPerson = persons.find(person => person.name === name);
    const updatedNumber = { ...existingPerson, number: newNumber };

    personsService.update(existingPerson.id, updatedNumber)
    .then(updatedPerson => {
      setPersons(persons.map(p => 
        p.id !== existingPerson.id ? p : updatedPerson))
      showNotification(`Updated ${name}`, 'success')
    })
    .catch(error => {
      console.error(`Error updating number for id${existingPerson.id}:`, error);
      showNotification(`Error updating number for ${name}: ${error.response.statusText}`, 'error')
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
        showNotification(`Added ${addedPerson.name}`, 'success')
      })
      .catch(error => {
        console.error(`Error adding new person:`, error);
        showNotification(`Error adding ${newPersonObject.name}: ${error.response.statusText}`, 'error')
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
        showNotification(`Deleted ${deletePerson.name}`, 'success')
      })
      .catch(error => {
        showNotification(`Error deleting ${person.name}: ${error.response.statusText}`, 'error') 
        console.error(`Error deleting person with id ${person.id}:`, error);
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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