import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  let notification = useSelector(state=>state.notification)
  console.log('notification', notification)
  return (
    <>
      {notification?
        <div style={style}>
          {notification}
        </div>:<div></div>
      }
    </>
   
  )
}

export default Notification