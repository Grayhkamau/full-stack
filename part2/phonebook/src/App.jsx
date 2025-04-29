import { useState } from "react";

const App=()=>{
  const [persons, setPersons] = useState([
    {name:'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredNames, setFilteredNames] = useState([])

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

      <p>filter shown with <input value={filter} onChange={handleFilter} type="text"/></p>
      <form onSubmit={(handleNewName)} >
        <div>

          name: <input 
          value={newName} 
          onChange={(e)=>setNewName(e.target.value)}/>

        </div>
        <div>

          number: <input 
          value={newNumber} 
          onChange={(e)=>setNewNumber(e.target.value)}/>

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>numbers</h2>
      {personsToBeShown.map((person,index)=>{
        return <p key={index}>{person.name} {person.number}</p>
      })}
    </div>
  )
}

export default App;