//@desc get all bootcamps
//@route GET /api/v1/bootcamps
//@access public

exports.getBootcamps = (req,res,next) => { 
    res
    .status(200)
    .json({success:true,msg:'Get All Bootcamps'})
}

//@desc get bootcamp by id 
//@route GET /api/v1/bootcamps/:id
//@access public

exports.getBootcamp = (req,res,next) => { 
    res
    .status(200)
    .json({success:true,msg:`Get Bootcamp with id ${req.params.id}`})
}

//@desc create new bootcamp
//@route POST /api/v1/bootcamps
//@access private

exports.createBootcamp = (req,res,next) => { 
    res
    .status(201)
    .json({success:true,msg:`bootcamp created`})
}

//@desc update single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access private

exports.updateBootcamp = (req,res,next) => { 
    res
    .status(200)
    .json({success:true,msg:`Bootcamp updated with id ${req.params.id}`})
}


//@desc delete single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access private

exports.deleteBootcamp = (req,res,next) => { 
    res
    .status(200)
    .json({success:true,msg:`Bootcamp deleted with id ${req.params.id}`})
}