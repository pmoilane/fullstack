import { useLazyQuery, useSubscription } from '@apollo/client/react'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { useEffect, useState } from 'react'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [genres, setGenres] = useState([])
  const [allBooks, { loading, data }] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'cache-and-network',
  })

  useSubscription(BOOK_ADDED, {
    onData: () => {
      allBooks({ variables: { genre: selectedGenre } })
    },
  })

  useEffect(() => {
    allBooks()
  }, [allBooks])

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  const books = data.allBooks
  const listOfGenres = new Set(books.flatMap((book) => book.genres))
  if ([...listOfGenres].length > genres.length) {
    setGenres(listOfGenres)
  }

  return (
    <div>
      <h2>books</h2>

      {selectedGenre ? (
        <>
          <div>
            in genre <b>{selectedGenre}</b>
          </div>
        </>
      ) : (
        <></>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...genres].map((genre) => (
          <button
            key={genre}
            onClick={() => {
              allBooks({ variables: { genre } })
              setSelectedGenre(genre)
            }}
          >
            {genre}
          </button>
        ))}
        <button
          onClick={() => {
            allBooks()
            setSelectedGenre(undefined)
          }}
        >
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books
