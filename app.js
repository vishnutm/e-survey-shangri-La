const express = require('express')
const cors = require('cors')
const PORT = 3000

const sequelize = require('./util/database')
sequelize.sync({ force: true });

const userRouter = require('./routers/user')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/users', userRouter)


app.listen(process.env.EXTERNAL_PORT || 3000);