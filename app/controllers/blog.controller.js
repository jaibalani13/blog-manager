const blog = require('../models/blog.model.js');

// Create and Save a new blog
exports.createBlogs = (req, res) => {
    // Validate request
    /*
    if(!req.body.content) {
        return res.status(400).send({
            message: "blog content can not be empty"
        });
    }
    */
    console.log("In createBlogs");
    var i = 0;
    var limit = 30000;
    for(i=0; i<limit; i++) {
        // Create a blog
        const newBlog = new blog({
            heading: "blog:" + i, 
            text: "intro",
            comments: []
        });

        // Save blog in the database
        newBlog.save()
        .then(data => {
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the blog."
            });
        });
    }
    res.send("Processing");

};