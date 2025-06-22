import Person from "./Person";

const Persons = ({ persons, filter, deletePerson }) => {

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
  
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => 
            <Person 
                key={person.id} 
                person={person} 
                deletePerson={deletePerson} 
            /> )
        }
      </ul>
    </div>
  )
}

export default Persons;

