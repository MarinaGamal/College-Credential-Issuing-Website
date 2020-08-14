const knex = require('./db')
// Retrieve all books
exports.booksAll = async (req, res) => {
  // Get all books from database
  knex
    .select('*') // select all records
    .from('newStudents') // from 'books' table
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving books: ${err}` })
    })
}

exports.booksUpdate = async (req, res) => {
  // Get all books from database
  knex('newStudents')
  .where( 'id', req.body.id )
  .update({ MasterDegree: true })
  

    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving books: ${err}` })
    })
}

// Create new book
exports.booksCreate = async (req, res) => {
  // Add new book to database
  knex('newStudents')
    .insert({ // insert new record, a book
      'Name': req.body.Name,
      'GPA': req.body.GPA,
      'Year': req.body.Year,
      'Type': req.body.Type,
      'MasterDegree':req.body.MasterDegree,
      'MasterDegreeYear':req.body.MasterDegreeYear
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `Student \'${req.body.Name}\' in ${req.body.Year} created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.title} book: ${err}` })
    })
}