import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      )
    },
  },
})

const { createBlog, setBlogs, deleteBlog, updateBlog } = blogSlice.actions

export const appendBlog = (content, currentUser) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(
      createBlog({
        ...newBlog,
        user: {
          id: newBlog.user,
          name: currentUser.name,
          username: currentUser.username,
        },
      }),
    )
    dispatch(
      setNotification(
        {
          message: `'${newBlog.title}' by ${newBlog.author} was added!`,
          isError: false,
        },
        5,
      ),
    )
    return newBlog
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(deleteBlog(blog.id))
    dispatch(
      setNotification(
        {
          message: `Removed '${blog.title}' by ${blog.author}`,
          isError: false,
        },
        5,
      ),
    )
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(
      updateBlog({
        ...likedBlog,
        user: {
          username: blog.user.username,
          name: blog.user.name,
          id: blog.user.id,
        },
      }),
    )
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogService.comment(blog.id, { comment })
    dispatch(
      updateBlog({
        ...commentedBlog,
        user: {
          username: blog.user.username,
          name: blog.user.name,
          id: blog.user.id,
        },
      }),
    )
  }
}

export default blogSlice.reducer
