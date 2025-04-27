import Part from ".Part.jsx";
const Content = ({parts}) => {
    return(
        parts.map(({name,exercises},index)=>{
            return(
                <Part key={index} name={name} exercises={exercises}/>
            )
        })
    )
};
export default Content;