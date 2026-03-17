import { useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import {
  initalizeCurrentUser,
  setCurrentUser,
} from './reducers/currentUserReducer'
import { initalizeUsers } from './reducers/usersReducer'
import UserList from './components/UserList'
import User from './components/User'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
} from 'react-router-dom'
import BlogList from './components/BlogList'
import Login from './components/Login'
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(({ currentUser }) => currentUser)
  const blogs = useSelector(({ blogs }) => blogs)
  const users = useSelector(({ users }) => users)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initalizeCurrentUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initalizeUsers())
  }, [dispatch])

  const matchUser = useMatch('/users/:id')
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null

  if (currentUser === null) {
    return (
      <Container>
        <Login />
      </Container>
    )
  }

  return (
    <Container>
      <div>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Button component={Link} to="/">
              blogs
            </Button>
            <Button component={Link} to="/users/">
              users
            </Button>
            <em>
              {' '}
              {currentUser.name} logged in
              <Button
                onClick={() => {
                  window.localStorage.removeItem('loggedBlogappUser')
                  dispatch(setCurrentUser(null))
                }}
              >
                log out
              </Button>
            </em>
          </Toolbar>
        </AppBar>
        <Typography variant="h2">blog app</Typography>
        <Notification />
        <Routes>
          <Route
            path="/"
            element={<BlogList blogs={blogs} currentUser={currentUser} />}
          />
          <Route path="/users" element={<UserList users={users} />} />
          <Route path="/users/:id" element={<User user={user} />} />
          <Route
            path="/blogs/:id"
            element={<Blog blog={blog} user={currentUser} />}
          />
        </Routes>
      </div>
    </Container>
  )
}

export default App
