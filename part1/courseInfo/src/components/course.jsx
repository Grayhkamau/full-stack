const Course = ({course})=>{
    let totalExercises = course.parts.reduce((accumulator,currentValue)=>{
        console.log("loop");
        
        return accumulator+currentValue.exercises;

    },0);
    console.log(totalExercises,"total")
    return(
        <div>
            <h1>{course.name}</h1>
            {
                course.parts.map(part=>{
                    
                    return(
                        <div key={part.id}>
                            <p>{part.name} {part.exercises}</p>
                        </div>
                    )
                   
                })
            }
            <p><b>Total of {totalExercises} exercises</b></p>
        </div>
    )
}

export default Course;