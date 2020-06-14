const Courses = require('../models/Course')
const errorResponse = require('../utils/errorResponse')
const asyncHandler = require('../utils/async')

// @desc get all courses and get all courses for specific bootcamp
// @route GET /api/v1/courses
// @route GET /api/v1/bootcamps/:bootcamp/courses
// @access public

exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;
    if (req.params.bootcamp) {
        query = Courses.find({ bootcamp: req.params.bootcamp })
    }
    else {
        query = Courses.find()
    }

    const courses = await query

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
})