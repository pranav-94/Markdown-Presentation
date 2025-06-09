import express from 'express'
import cors from 'cors'
import slideRouter from './slideRoute'
import sequelize from './db'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/slides',slideRouter);

const start = async()=>{
    try{
        await sequelize.sync()
        app.listen(3000)
    }
    catch(err){
        console.log(err)
    }
}

start()
