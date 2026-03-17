import { Link } from 'react-router-dom'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

const BlogList = ({ blogs }) => {
  const theme = useTheme()
  const blogFormRef = useRef()

  const blogFormVisibility = () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Togglable buttonlabel="create new blog" ref={blogFormRef}>
        <BlogForm toggleVisibility={blogFormVisibility} />
      </Togglable>
      <TableContainer component={Paper} theme={theme}>
        <Table>
          <TableBody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title} {blog.author}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
