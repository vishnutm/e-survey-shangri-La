const express = require('express')
const cors = require('cors')
const PORT = 3000

const sequelize = require('./util/database')

const userRouter = require('./routers/user')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', userRouter)

// (async () =>{
//     try {
      
//     } catch (error) {
//       console.error(error);
//     }
//   })()

sequelize.sync({force: true});
app.listen(process.env.EXTERNAL_PORT || 3001);