import { useContext } from "react"
import { NotificationContext, useReturnNotification } from "../context"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const notification = useReturnNotification()
 

  return (
    <>
      {notification?
        <div style={style}>
              {notification}
        </div>:''
      }
    </>
   
    
  )
}

export default Notification
