const comment = require('../models/comment.model.js');
const blog = require('../models/blog.model.js');
const user = require('../models/user.model.js');

// Create and Save a new comment
exports.populateComments = async (req, res) => {
    // Validate request
    /*
    if(!req.body.content) {
        return res.status(400).send({
            message: "comment content can not be empty"
        });
    }
    */

    console.log("In create");

    //fetch all blogs
    let blogArr = []
    blogArr = await blog.find({}).exec();
    //console.log(blogArr)

    //fetch all users
    let userArr = []
    userArr = await user.find({}).exec();
    //console.log(userArr)
    //console.log(userArr[0]._id)

    //assign 1 user to each blog first then randomize
    let i=0
    let j=0

    //ensure each blog has atleast 1 comment
    console.log("1")
    for(i=0; i<blogArr.length; i++){
        console.log(i);
        const newComment = new comment({
            user: userArr[i]._id,
            blog: blogArr[i]._id,
            message: "message"
        });
        //commentArray.push(newComment.save()); 

        newComment.save().then(comment => {
                console.log("2")
                blogArr[i%blog_limit].comments.push(comment._id);
                blogArr[i%blog_limit].save().then(blog => {
                    console.log('Saving blog: ', i);
                })
            });

        //blogArr[i].comments.push(temp._id)
    }

    let sum = 0, blog_limit=30000, user_limit = 50000;
    for(j=0; j<userArr.length; j++){
        let x = Math.floor(Math.random()*100) + 1

        for(let k=sum; k<sum+x; k++){
            const newComment = new comment({
                user: userArr[j]._id,
                blog: blogArr[k%blog_limit]._id,
                message: "message"
            });
            newComment.save().then(comment => {
                blogArr[k%blog_limit].comments.push(comment._id);
                blogArr[k%blog_limit].save().then(blog => {
                    console.log('Saving blog: ', k);
                })
            });
        }
        sum = sum + x;
    }

    // console.log('2', commentArray);

    // let commentDetailsArr = await Promise.all(commentArray.map(comment => comment.commentPromise));

    // for(i=0; i<commentArray.length; i++) {
    //     blogArr[commentArray[i].blogIndex].comments.push(commentDetailsArr[i]._id);
    //     blogArr[commentArray[i].blogIndex].save().then((data) => {
    //         console.log('saving...', )
    //     });
    // }

    // const newBlogs = await Promise.all(blogPromisesArr);

    // console.log('3', newBlogs);




/*
    var i = 0;
    var limit = 30000;
    for(i=0; i<limit; i++) {
        // Create a comment
        const newComment = new comment({
            heading: "comment:" + i, 
            text: "intro",
            comments: []
        });

        // Save comment in the database
        newComment.save()
        .then(data => {
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the comment."
            });
        });
    }
*/
    res.send("Processing");

};