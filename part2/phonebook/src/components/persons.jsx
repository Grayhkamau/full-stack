const Persons = ({personsToBeShown, handleDeleteUser})=>{
    return(
        <div>
            {personsToBeShown.map((person,index)=>{
                console.log(person)
                return <p key={index}>{person.name} {person.number} <button onClick={()=>handleDeleteUser(person.id,person.name)}>Delete</button></p>

            })}
        </div>
       
    )
}

export default Persons;