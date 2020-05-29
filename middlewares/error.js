const errorResponse = require('../utils/errorResponse')

const errorMiddleware = (err,req,res,next) => { 
 let error = {...err}
 error.message = err.message

 console.log(err)
 
 //mongodb object id not valid
 if(err.name === 'CastError'){ 
     let message = `Resouce not found with id ${err.value}`
     error = new errorResponse(message,400)
 }

 //duplication error 
 if(err.code === 11000) { 
     let message = `Resouce Already exist`
     error = new errorResponse(message,400)
 }

 //validation check
 if(err.name === 'ValidationError') { 
     let message = Object.values(err.errors).map(val => val.message)
     error = new errorResponse(message,400)
 }


 res.status(error.statusCode || 500).
 json({success:false,error:error.message || 'Server Error'})
 next()
}

module.exports = errorMiddleware;