const supertest = require('supertest')
const mongoose = require('mongoose')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})

describe('tests for GET "/api/blogs"', () => {
  test('correct number of JSON blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, helper.blogs.length)
  })
  test('indentifier key for blogs is called id', async () => {
    const response = await api
      .get('/api/blogs')
    const checkResults = response.body.map((blog) => blog.id ? true : false)
    assert.strictEqual(checkResults.every(check => check === true), true)
  })
})

describe('tests for POST "/api/blogs"', () => {
  test('blogs can be added', async () => {
    const blogsBeforePOST = await api.get('/api/blogs')
    const newBlog = {
      "title": "JavaScript tutorial",
      "author": "John",
      "url": "http://blogman.com",
      "likes": 2
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAfterPOST = await api.get('/api/blogs')
    assert.strictEqual(blogsBeforePOST.body.length + 1, blogsAfterPOST.body.length)
    const checkBlogs = blogsAfterPOST.body.some(blog => 
      blog.title === newBlog.title &&
      blog.author === newBlog.author &&
      blog.url === newBlog.url &&
      blog.likes === newBlog.likes
    )
    assert.strictEqual(checkBlogs, true)
  })
  test('if blog does not have likes field, it gets value 0', async () => {
    const newBlog = {
      "title": "JavaScript tutorial",
      "author": "John",
      "url": "http://blogman.com"
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.likes, 0)
  })
  test('if blog does not have a title or url, return status 400 Bad Request', async () => {
    const newBlog = {
      "author": "John",
      "url": "http://blogman.com"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const newBlog2 = {
      "title": "JavaScript tutorial",
      "url": "http://blogman.com"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})
describe('tests for DELETE "/api/blogs"', () => {
  test('delete blog by id', async () => {
    const blogsBeforeDELETE = await api.get('/api/blogs')
    await api
      .delete(`/api/blogs/${blogsBeforeDELETE.body[0].id}`)
    const blogsAfterDELETE = await api.get('/api/blogs')
    assert.strictEqual(blogsBeforeDELETE.body.length - 1, blogsAfterDELETE.body.length)
  })
})
describe('tests for PUT "/api/blogs"', () => {
  test('update blog by id', async () => {
    const blogs = await api.get('/api/blogs')
    const updatedBlog = { ...blogs.body[0], likes: 28 }
    const returnedBlog = await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)
    assert.deepStrictEqual(updatedBlog, returnedBlog.body)
  })
})

after(async () => {
  await mongoose.connection.close()
})