
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const { users } = require('./state')

//Basic info you need for it to show in browser.
// app.get('/', (req, res) => res.send('Hello World'))


/* BEGIN - create routes here */
// app.get('/users', (req, res) => {
// res.json(users)
// })

app.get('/users/1', (req, res) => {
  return res.json(users[0]);
  })

app.get('/users/:userId', (req, res) => {
  const id = req.params.userId
  console.log(id)

  const filteredUsers = users.filter((user) => user._id === Number(id))
  console.log(filteredUsers)
  })


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))