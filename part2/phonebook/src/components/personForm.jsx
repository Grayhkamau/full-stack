const PersonForm = ({handleNewName,newName,setNewName,newNumber,setNewNumber})=>{
    return(
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
            <button type="submit">add</button>
      </form>
    )
}

export default PersonForm