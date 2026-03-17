import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material'

const UserList = ({ users }) => {
  return (
    <div>
      <Typography variant="h4">Users</Typography>
      <TableContainer component={Paper} color="primary">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>names</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody color="primary">
            {[...users]
              .sort((a, b) => b.blogs.length - a.blogs.length)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell color="primary">
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
