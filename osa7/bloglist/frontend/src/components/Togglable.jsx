import { useState, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          onClick={toggleVisibility}
          style={{ background: '#ff7518', borderRadius: 10 }}
        >
          {props.buttonlabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          style={{ background: 'lightgrey', borderRadius: 10 }}
        >
          cancel
        </Button>
      </div>
    </div>
  )
}

export default Togglable
