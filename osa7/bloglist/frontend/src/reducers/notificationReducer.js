import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    isError: false,
  },
  reducers: {
    sendNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return { ...state, message: null }
    },
  },
})

const { sendNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(sendNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
