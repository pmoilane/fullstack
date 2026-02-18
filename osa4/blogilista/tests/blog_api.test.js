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
  test('all blogs are returned as JSON', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    console.log(response.body)
    assert.strictEqual(response.body.length, helper.blogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})