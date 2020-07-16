
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const { users } = require('./state');
const bodyParser = require('body-parser');

const counter = users.length;

//Basic info you need for it to show in browser.
// app.get('/', (req, res) => res.send('Hello World'))

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


/* BEGIN - create routes here */
app.get('/users', (req, res) => {
res.json(users)
})

app.get('/users/1', (req, res) => {
  return res.json(users[0]);
  })

app.get('/users/:userId', (req, res) => {
  const id = req.params.userId
  console.log(req)
  console.log(id)
  const filteredUsers = users.filter((user) => user._id === Number(id))
  res.json(filteredUsers)
  })

app.post('/users', (req, res) => {
  users.push({
    _id: (counter + 1),
    ...req.body
  });
  // const newUser = {
  //   _id: (counter += 1),
  //   Name: req.body.name,
  //   Occupation: req.body.occupation,
  //   Avatar: req.body.avatar
  // }
  // users.push(newUser);
  res.json(users);
})

app.put('users/:id', (req, res) => {
  const found = users.some(user => user.id === Number(req.params.id));

  if (found) {
    const updatedUser = req.body;
    users.forEach(user => {
      if(user.id === Number(req.params.id)) {
        user.name = updatedUser.name ? updatedUser.name : user.name;
        user.occupation = updatedUser.occupation ? updatedUser.occupation : user.occupation;
        user.avatar = updatedUser.avatar ? updatedUser.avatar : user.avatar;
      }
    })
  } 
  else {
      res.status(400).json({ msg: `User with ${req.params.id} doesn't exist. Try again.`})
    }
    
  res.json(users)
  }
)


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))