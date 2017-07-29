const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dragons = JSON.parse(fs.readFileSync('./data/dragons.json', 'utf8'))

app.use(bodyParser.json())


// static pages
app.use('/', express.static('view/public'))
app.use('/app', express.static('view/app'))


// API
app.get('/dragons', (req, res) => {
  res.send({
    dragons: dragons
  })
})

app.post('/dragons', (req, res) => {

})


app.post('/dragons/delete', (req, res) => {

})

app.post('/dragon/update', (req, res) => {

})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
