const fs = require('fs')
const express = require('express')
const path = require('path')

const wordsJSON = fs.readFileSync('./words.json', 'UTF8')

const port = 8080
const app = express()

app.use(express.static(path.join(__dirname, 'static')))

app.get('/unjumbler', function (request, response) {
  response.json(wordsJSON)
  console.log('get')
})

app.listen(port)
