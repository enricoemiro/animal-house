const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/api', (req, res) => {
  res.send('/bundles/api-bundle/dist/main.js')
})

app.get('/frontoffice', (req, res) => {
    res.send('/bundles/frontoffice/dist/index.html')
  })
