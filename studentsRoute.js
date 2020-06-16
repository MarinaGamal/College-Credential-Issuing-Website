const express = require('express')
// Import books-controller
const studentsRoutes = require('./studentsController')
// Create router
const router = express.Router()
// Add route for GET request to retrieve all book
// In server.js, books route is specified as '/books'
// this means that '/all' translates to '/books/all'
router.get('/all', studentsRoutes.booksAll)

// Add route for POST request to create new book
// In server.js, books route is specified as '/books'
// this means that '/create' translates to '/books/create'
router.post('/create', studentsRoutes.booksCreate)

module.exports = router
