import { useImperativeHandle, useState } from "react";


const Toggable = (props)=>{

    const [showForm,setShowForm] = useState(false)
    const hideWhenVisible = {display: showForm ? '':'none'};
    const showWhenInvisible = {display: showForm? 'none': ''};

    useImperativeHandle(props.ref, ()=>{
        return {toggleVisibility}
    })
    const toggleVisibility = ()=> setShowForm(!showForm)
    return(
        <div>
            <div style={showWhenInvisible}>
                <button onClick={toggleVisibility}>Add blogs</button>
            </div>
            <div style={hideWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Toggable