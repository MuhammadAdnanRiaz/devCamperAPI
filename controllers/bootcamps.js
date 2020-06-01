const Bootcamp = require('../models/Bootcamp')
const errorResponse = require('../utils/errorResponse')
const asyncHandler = require('../utils/async')
const geocoder = require('../utils/geocoder')
//@desc get all bootcamps
//@route GET /api/v1/bootcamps
//@access public

exports.getBootcamps = asyncHandler(async (req,res,next) => {
    let query

    //copy req.query
    const reqQuery = {...req.query}

    //Fields to exlcude
    const removeFields = ['select','sort','page','limit']

    //loopover query and remove fields
    removeFields.forEach(param => delete reqQuery[param])

    //create query string
    let queryStr = JSON.stringify(reqQuery)

    //create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`)

    //finding resource
    query = Bootcamp.find(JSON.parse(queryStr))
    
    //select fields 
    if(req.query.select){ 
        const fields = req.query.select.split(',').join(' ')
        query= query.select(fields)
    }

    //sort
    if(req.query.sort) { 
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }else { 
        query = query.sort('-createdAt')
    }

    //pagination 
    const page = parseInt(req.query.page,10) || 1
    const limit = parseInt(req.query.limit,10) || 2
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await Bootcamp.countDocuments()

    query = query.skip(startIndex).limit(limit)

    //pagination result 
    const pagination = {}
    
    if(endIndex < total) { 
        pagination.next = { 
            page: page + 1,
            limit
        }
    }

    if(startIndex > 0) { 
        pagination.prev = { 
            page: page - 1,
            limit
        }
    }

    //execute query
    const bootcamps = await query;
    res.status(200).json({success:true,count:bootcamps.length,pagination,data:bootcamps})
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