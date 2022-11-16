const express = require('express')
const mongoose = require('mongoose')

const questionRouter = require('./routes/Questions')

require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {})

app.use('/api/v1/questions', questionRouter)

async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION)

    app.listen(port, () => {
      console.log(`Server has been started on port ${port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

main()
