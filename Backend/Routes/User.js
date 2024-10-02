const mongoose = require('mongoose');
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../Middleware/User");
const {User} = require("../db");
const {Course} = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username= req.body.username;
    const password=req.body.password;

    await User.create({
        username:username,
        password:password
    })
    res.json({
            message : "User created successfully"
    })
    
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
    .then(function(response){
        res.json({
            courses : response 
        })
    })




});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic

    const courseID = req.params.courseId;
    const username = req.headers.username;
    User.updateOne({
        username : username
    },{
        "$push":{
            purchasedCourses:new mongoose.Types.ObjectId(courseID)
        }
    }).catch(function(e){
        console.log(e);
    });
    res.json({

        "message" : "Purchased successful"
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic

    const user = await User.findOne({
        username: req.headers.username
    });
   
    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })



});

module.exports = router