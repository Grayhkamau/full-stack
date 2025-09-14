import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";


const notificationReducer = (state,action)=>{
    switch (action.type) {
        case 'notify':
            return action.payload
            
    
        default:
            return ''
    }
}

export const NotificationContext = createContext();

const NotificationProviderContext = (props)=>{
    const [notification, notificationDispatch] = useReducer(notificationReducer,'');

    return(
        <NotificationContext.Provider value={[notification,notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}
export default NotificationProviderContext

export const useReturnNotification = ()=>{
    const notificationArray = useContext(NotificationContext);

    return notificationArray[0]
}
export const useReturnNotificationDispatch = ()=>{
    const notificationArray = useContext(NotificationContext);

    return notificationArray[1]
}