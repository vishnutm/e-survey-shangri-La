const express = require('express')
const bcrypt = require('bcrypt');
const cors = require('cors')
const PORT = 3000

const sequelize = require('./util/database')
const db = require('./models')
sequelize.sync({ force: false }).then(async(response) => {
   await db.User.upsert({
        username:'Admin',
        email:'admin@shangrila.gov.un',
        password:bcrypt.hashSync('shangrila@2021$',bcrypt.genSaltSync(8)),
        SNI:'ADMIN001',
        dob:'1992-3-23'
    }).catch((err)=> console.log(err)),
    await db.sni.bulkCreate(
       [{sniNo:'MM2874Z6'},{sniNo:'FEQQ6UUG'},{sniNo:'34GC829B'},{sniNo:'CB8FBCCM'}]
    ).catch((err)=> console.log(err))
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