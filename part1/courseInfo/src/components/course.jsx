const Course = ({course})=>{
    let courseAndExcercisesArray = []
   course.forEach(course => {
        let selectCourse = {name:course.name, exercises:""};
        selectCourse.exercises = course.parts.reduce((accumulator, currentValue)=>{
            return accumulator+currentValue.exercises;
        },0);
        courseAndExcercisesArray.push(selectCourse)
   });
   console.log(courseAndExcercisesArray,'excercises array')
    return(
        <div>
            {course.map((course, index)=>{
                return(
                    <>
                    <h1>{course.name}</h1>
                    {course.parts.map((exercises)=>{
                       return <p>{exercises.name}</p>
                    })}
                    <p><b>total of {courseAndExcercisesArray[index].exercises} exercises</b></p>
                    </>
                )
            })}
        </div>
    )
}

export default Course;