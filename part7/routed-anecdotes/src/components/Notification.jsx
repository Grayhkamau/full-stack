const Notification = ({notification})=>{
    return(
        <>
            {notification?<p>{notification}</p>:''}
        </>
    )
}

export default Notification;