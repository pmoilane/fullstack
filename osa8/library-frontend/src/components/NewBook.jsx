import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ALL_BOOKS, NEW_BOOK } from '../queries'
import { addBookToCache } from '../utils/apolloCache'

const NewBook = ({ show, setPage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishedString, setPublishedString] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(NEW_BOOK, {
    update: (cache, response) => {
      const addedBook = response.data.addBook
      console.log(addedBook)
      addBookToCache(cache, addedBook)
    },
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const published = Number(publishedString)
    createBook({ variables: { title, author, published, genres } })

    setTitle('')
    setPublishedString('')
    setAuthor('')
    setGenres([])
    setGenre('')
    setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={publishedString}
            onChange={({ target }) => setPublishedString(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
