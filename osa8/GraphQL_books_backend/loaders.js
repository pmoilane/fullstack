const Dataloader = require('dataloader')
const Book = require('./models/book')
const _ = require('lodash')

const bookLoader = new Dataloader((authorIDs) => {
  return Book.find({}).then((books) => {
    const booksById = _.groupBy(books, 'author')
    return authorIDs.map((authorID) => booksById[authorID])
  })
})

module.exports = bookLoader
