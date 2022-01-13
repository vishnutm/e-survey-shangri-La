const express =  require('express')
const cors = require('cors')
const PORT = 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.listen(PORT,()=>{

    console.info(`listening on port ${PORT}`)
})