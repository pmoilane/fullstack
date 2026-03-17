import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, List, ListItem, Typography } from '@mui/material'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  if (!blog) {
    return null
  }
  return (
    <div>
      <Typography variant="h4">
        {blog.title} {blog.author}
      </Typography>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <Button
          style={{ background: '#ff7518', borderRadius: 10 }}
          onClick={() => dispatch(likeBlog(blog))}
        >
          like
        </Button>
        <br />
      </div>
      <div>added by {blog.user.name}</div>
      <div>
        {blog.user.username === user.username && (
          <Button
            style={{ background: '#9932CC', borderRadius: 10 }}
            onClick={() => {
              if (
                window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
              ) {
                dispatch(removeBlog(blog))
                navigate('/')
              }
            }}
          >
            remove
          </Button>
        )}
      </div>
      <Typography variant="h5">comments</Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          console.log(blog.id, comment)
          dispatch(commentBlog(blog, comment))
          setComment('')
        }}
      >
        <div>
          <TextField
            label="comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button
            type="submit"
            style={{ background: '#ff7518', borderRadius: 10 }}
          >
            add comment
          </Button>
        </div>
      </form>
      <List>
        {blog.comments.map((comment) => (
          <ListItem key={comment}>{comment}</ListItem>
        ))}
      </List>
    </div>
  )
}

export default Blog
