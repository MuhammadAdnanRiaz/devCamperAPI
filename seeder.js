const fs =require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv') 

// Load env 
dotenv.config({path:'./config/config.env'})

// Load Models
const Bootcamp = require('./models/Bootcamp')

//Connect to DB
mongoose.connect(process.env.MONGO_URI,{ 
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})

//Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'))

//import into db 
const importData = async () => { 
    try {
        await Bootcamp.create(bootcamps)
        console.log('Data imported'.green.inverse)
        process.exit()
    } catch (error) {
        
    console.error(error)
    }
}

//Delete Data 
const deleteData = async () => { 
    try {
        await Bootcamp.deleteMany()
        console.log('Data Destroyed'.red.inverse)
        process.exit()
    } catch (error) {
    console.error(error)        
    }
}

if(process.argv[2] === '-i'){ 
    importData()
}
else if(process.argv[2] === '-d') { 
    deleteData()
}