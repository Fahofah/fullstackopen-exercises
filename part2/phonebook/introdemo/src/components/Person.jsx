import axios from "axios"

const Person = ({ person, deletePerson }) => {
   
    return (
        <p>{person.name} {person.number} <button onClick={(event) => deletePerson(event, person)} >delete</button></p>
    )
}

export default Person