const express = require('express')
const cors = require('cors')
const PORT = 3000

const sequelize = require('./util/database')
const db = require('./models')
sequelize.sync({ force: false }).then(async(response) => {
   await db.Admin.upsert({
        username:'Admin',
        email:'admin@shangrila.gov.un',
        password:'shangrila@2021$'
    }).catch((err)=> console.log(err))
});

const userRouter = require('./routers/user')
const adminRouter = require('./routers/admin')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/users', userRouter)
app.use('/admin',adminRouter)

app.listen(process.env.EXTERNAL_PORT || 3000);