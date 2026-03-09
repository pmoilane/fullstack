import { useReducer, useEffect } from "react"
import { createContext } from "react"


const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return action.payload
    case 'REMOVE':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        notificationDispatch({ type: 'REMOVE' })
      }, 5000)
      return () => {clearTimeout(timer)}
    }
  }, [notification, notificationDispatch])

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext