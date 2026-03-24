import { useMutation, useQuery } from '@apollo/client/react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [bornString, setBornString] = useState('')
  const result = useQuery(ALL_AUTHORS)

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const submit = (event) => {
    event.preventDefault()
    const setBornTo = Number(bornString)

    changeBorn({ variables: { name: name.value, setBornTo } })
    setName(null)
    setBornString('')
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? (
        <>
          <h2>Set birthyear</h2>
          <form onSubmit={submit}>
            <div style={{ maxWidth: 200 }}>
              name
              <Select
                value={name}
                onChange={setName}
                options={authors.map((author) => ({
                  value: author.name,
                  label: author.name,
                }))}
              />
            </div>
            <div>
              born
              <input
                value={bornString}
                onChange={({ target }) => setBornString(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Authors
