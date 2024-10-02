const { Router } = require("express");
const adminMiddleware = require("../Middleware/Admin");
const router = Router();
const {Admin, Course} = require("../db");
const {user} = require("../db");

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // Check if user with this username already exists 
    await Admin.create({
        username:username,
        password:password
    })
    res.json({
            message : "Admin created successfully"
    })


});

// Input: Headers: { 'username': 'username', 'password': 'password' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
//   Output: { message: 'Course created successfully', courseId: "new course id" }

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const title = req.body.title;
    const description=req.body.description;
    const price = req.body.price;
    const imageLink=req.body.imageLink;

    const newCourse= await Course.create({
        title,
        description,
        price,
        imageLink
    })

    console.log(newCourse);

    res.json({
        message:"Course created successfully",
        courseID:newCourse._id

    })
    

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic

     Course.find({})
        .then(function(response){
            res.json({
                courses : response 
            })
        })


});



module.exports = router;