const Buttons = ({onClick,text})=>{
    return(
        <button onClick={onClick}>
            {text}
        </button>
    )
};

export default Buttons;