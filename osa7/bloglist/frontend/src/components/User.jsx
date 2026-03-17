import { List, ListItem, Typography } from '@mui/material'

const User = ({ user }) => {
  console.log(user)
  if (!user) {
    return null
  }
  return (
    <div>
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h6">added blogs</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </div>
  )
}

export default User
