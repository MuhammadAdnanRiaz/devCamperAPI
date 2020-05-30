const Bootcamp = require('../models/Bootcamp')
const errorResponse = require('../utils/errorResponse')
const asyncHandler = require('../utils/async')
const geocoder = require('../utils/geocoder')
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

//@desc Filter Bootcamps with city postal code and distance radius
//@route GET /api/v1/bootcamps/radius/:postalCode/:distance
//@access private

exports.getBootcampsWithRadius = asyncHandler(async (req,res,next) => { 
    //Earth Radius in miles 3963
    //fetching longitude and latitude from postal code 
    const loc = await geocoder.geocode(req.params.postCode)
    const lng = loc[0].longitude
    const lat = loc[0].latitude
    const radius = req.params.distance / 3963
    const bootcamps = await Bootcamp.find({
        location :{ 
            $geoWithin : { 
                $centerSphere : [[lng,lat],radius]
            }
        }
    })
    res.status(200).json({
        success:true,
        count:bootcamps.length,
        data:bootcamps
    })
})