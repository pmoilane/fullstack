import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, favoriteGenre } from '../queries'

const Recommended = ({ show, token }) => {
  const genre_result = useQuery(favoriteGenre, {
    skip: !token,
  })
  const books_result = useQuery(ALL_BOOKS, {
    variables: { genre: genre_result.data?.me?.favoriteGenre },
    skip: genre_result.loading,
    fetchPolicy: 'cache-and-network',
  })

  if (!show) {
    return null
  }

  if (books_result.loading) {
    return <div>loading...</div>
  }

  const books = books_result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre {genre_result.data.me.favoriteGenre}</p>
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
    </div>
  )
}

export default Recommended
