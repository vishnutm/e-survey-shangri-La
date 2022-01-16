// const express = require('express')
// const cors = require('cors')
// const PORT = 3000

// const sequelize = require('./util/database')

// const userRouter = require('./routers/user')
// sequelize.sync({force: false});
// const app = express()
// app.use(cors())
// console.log("enter");
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use('/', userRouter)
// console.log("userroutes",userRouter);
// // (async () =>{
// //     try {
      
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   })()


// app.listen(process.env.EXTERNAL_PORT || 3001);

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
l
const api = require("./routers/user");
const db = require('./util/database');
dotenv.config();
global.rootDir = __dirname;
db.sequelize.sync();
const app = express()

app.get('/', (req, res) => {
    return res.status(200).send({
        'message': 'Registration:/api/user/register,login:/api/user/login,verifyMail'
    });
});

app.use(cors());
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api', api);

console.log('app running on ports ',)


