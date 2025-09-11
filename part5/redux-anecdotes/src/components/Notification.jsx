import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  let notification = useSelector(state=>state.notification)
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification