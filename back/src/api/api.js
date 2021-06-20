const express = require('express')
const app = express()

app.get('/message', (req,res) => {
    res.send("messages list")
})

app.listen(8080, () => {
    console.log('Server is listening')
})
