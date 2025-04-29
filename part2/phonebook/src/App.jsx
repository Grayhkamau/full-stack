import { useEffect, useState } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import axios from 'axios';

const App=()=>{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredNames, setFilteredNames] = useState([])

  useEffect(()=>{
    let promise = axios.get("http://localhost:3001/persons");

    promise.then(response=>{
      setPersons(response.data)
    })
  },[])

  const handleNewName = (e)=>{
      e.preventDefault();
      if(!newName||!newNumber) return;

      let exists = persons.findIndex(person=>{
        return person.name===newName
      })

      if(exists>=0) {
        setNewName("")
        return alert(`${newName} is already added to the phonebook`)
      }
      setPersons([...persons, {name:newName,number:newNumber}])
      setNewName("")
      setNewNumber('')
  }
  const handleFilter = (e)=>{
    setFilter(e.target.value);
    let personsFiltered = persons.filter((person)=>{
      console.log(person.name.toLowerCase())
      return person.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    console.log(personsFiltered)
    setFilteredNames(personsFiltered);
  }
  let personsToBeShown = filteredNames.length?filteredNames:persons
  return(
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>

      <PersonForm handleNewName={handleNewName} setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber}/>

      <h2>numbers</h2>
      <Persons personsToBeShown={personsToBeShown}/>
    </div>
  )
}

export default App;