import { useEffect, useState } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import personServices from './services/persons';
import Notification from './components/notification';
const App=()=>{
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filteredNames, setFilteredNames] = useState([]);
  const [notification,setNotification] = useState('');
  const [notificationType,setNotificationType] = useState('')
  
  useEffect(()=>{
    personServices.getAll()
    .then(persons=>setPersons(persons))
  },[])

  const handleNewName = (e)=>{
      e.preventDefault();
      if(!newName||!newNumber) return;

      let exists = persons.findIndex(person=>{
        return person.name===newName 
      })
   
      if(exists>=0) {
        if(persons[exists].number!==newNumber){
          if(!window.confirm(`${newName} is already added to the phonebook, replace the number with a new one?`)) return;
            personServices.update(persons[exists].id, {name:newName,number:newNumber})
            .then(updatedPerson=>{
                setPersons(persons.map(person=>person.name===newName?updatedPerson:person))

                setNotificationType('success')
                setNotification(`${newName}'s number has been changed to ${newNumber}`)
                

                setTimeout(() => {setNotification('')}, 5000);

                setNewName("")

                setNewNumber('')
            })
            .catch(error=>{
              setNotificationType('fail')
              setNotification(`${newName} had already been removed from the server`);
              setTimeout(() => {setNotification('')}, 5000);
              setPersons(persons.filter(person=>person.name!==newName))
            })
            return;
        }
       
        setNewName("")
        setNewNumber('')
        return alert(`${newName} is already added to the phonebook`)
      }

      personServices.create({name:newName,number:newNumber})
        .then(({name,number,id})=>{
          setPersons([...persons, {name,number, id}])

          setNotificationType('success')
          setNotification(`${newName} with number ${newNumber} has been added to the phonebook`)

          setTimeout(() => {
            setNotification('')
          }, 5000);

          setNewName("")

          setNewNumber('')
        })
    
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

  const handleDeleteUser = (id, name)=>{
    if(!window.confirm(`delete ${name} ?`)) return;
    personServices.deleteUser(id)
    .then(personDeleted=>{
      setPersons(persons.filter(person=>person.id!==personDeleted.id))
    })
  }
  let personsToBeShown = filteredNames.length?filteredNames:persons
  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} notificationType={notificationType}/>
      <Filter filter={filter} handleFilter={handleFilter}/>

      <PersonForm handleNewName={handleNewName} setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber}/>

      <h2>numbers</h2>
      <Persons personsToBeShown={personsToBeShown} handleDeleteUser={handleDeleteUser}/>
    </div>
  )
}

export default App;