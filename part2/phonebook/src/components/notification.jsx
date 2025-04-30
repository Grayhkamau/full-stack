const Notification = ({message, notificationType})=>{
    if(!message) return;
    let styles = {
        color: notificationType==='success'?'green':'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding:10,
        marginBottom: 10
    }
    return(
        <div style={styles}>{message}</div>
    )
}

export default Notification;