const Persons = ({personsToBeShown})=>{
    return(
        <div>
            {personsToBeShown.map((person,index)=>{
                return <p key={index}>{person.name} {person.number}</p>
            })}
        </div>
       
    )
}

export default Persons;