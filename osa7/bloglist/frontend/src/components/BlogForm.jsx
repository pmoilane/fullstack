import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const currentUser = useSelector(({ currentUser }) => currentUser)

  const addBlog = async (event) => {
    event.preventDefault()
    dispatch(
      appendBlog(
        {
          title,
          author,
          url,
        },
        currentUser,
      ),
    )
    toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            label="title"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="author"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="url"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          type="submit"
          style={{ background: '#ff7518', borderRadius: 10 }}
        >
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
