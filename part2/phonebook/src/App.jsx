import { useState } from "react";

const App=()=>{
  const [persons, setPersons] = useState([
    {name:'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
    console.log('reaching before')

    setPersons([...persons, {name:newName,number:newNumber}])
    setNewName("")
  }
  // console.log(persons)
 
  return(
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(handleNewName)}>
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
      {persons.map((person,index)=>{
        return <p key={index}>{person.name} {person.number}</p>
      })}
    </div>
  )
}

export default App;