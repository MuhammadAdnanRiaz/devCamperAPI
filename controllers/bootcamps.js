const Bootcamp = require('../models/Bootcamp')
const errorResponse = require('../utils/errorResponse')
const asyncHandler = require('../utils/async')
//@desc get all bootcamps
//@route GET /api/v1/bootcamps
//@access public

exports.getBootcamps = asyncHandler(async (req,res,next) => { 
    const bootcamps = await Bootcamp.find();
    res.status(200).json({success:true,count:bootcamps.length,data:bootcamps})
})

//@desc get bootcamp by id 
//@route GET /api/v1/bootcamps/:id
//@access public

exports.getBootcamp = asyncHandler(async (req,res,next) => { 
    const bootcamps = await Bootcamp.findById(req.params.id);
       if(!bootcamps) { 
           return next(new errorResponse(`Resouce not found with id ${req.params.id}`,400))
       }
       res.status(200).json({success:true,data:bootcamps})
})

//@desc create new bootcamp
//@route POST /api/v1/bootcamps
//@access private

exports.createBootcamp = asyncHandler(async (req,res,next) => { 
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({
        success:true,
        result:bootcamp
    })
})

//@desc update single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access private

exports.updateBootcamp = asyncHandler (async (req,res,next) => { 
    const bootcamp = await Bootcamp.findByIdAndUpdate(
        req.params.id,
        req.body,
        ({
            new:true,
            runValidators:true
        })
        )
    if(!bootcamp) { 
        return next(new errorResponse(`Resouce not found with id ${req.params.id}`,400))
    }
    res.status(200).json({success:true,data:bootcamp})  
})


//@desc delete single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access private

exports.deleteBootcamp = asyncHandler(async (req,res,next) => { 
    const bootcamp = await Bootcamp.findByIdAndDelete(
        req.params.id
        )
    if(!bootcamp) { 
        return next(new errorResponse(`Resouce not found with id ${req.params.id}`,400))
    }
    res.status(200).json({success:true,data:{}})
})