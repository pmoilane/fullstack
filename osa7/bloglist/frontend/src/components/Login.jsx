import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logInUser } from '../reducers/currentUserReducer'
import Notification from './Notification'
import { TextField, Button } from '@mui/material'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const logInSuccess = await dispatch(logInUser(username, password))
    if (logInSuccess) {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <h2>login to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          type="submit"
          style={{ background: '#ff7518', borderRadius: 10 }}
        >
          login
        </Button>
      </form>
    </div>
  )
}

export default Login
