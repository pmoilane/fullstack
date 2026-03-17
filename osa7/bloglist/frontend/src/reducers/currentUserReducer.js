import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: null,
  reducers: {
    setCurrentUser(state, action) {
      return action.payload
    },
  },
})

export const { setCurrentUser } = currentUserSlice.actions

export const initalizeCurrentUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user))
    }
  }
}

export const logInUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user))
      return true
    } catch (error) {
      console.log(error.response.data)
      dispatch(
        setNotification(
          {
            message: 'wrong username or password',
            isError: true,
          },
          5,
        ),
      )
      return false
    }
  }
}

export default currentUserSlice.reducer
