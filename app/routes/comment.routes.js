module.exports = (app) => {
    const comments = require('../controllers/comment.controller.js');

    console.log("in routes")
    // Create all comments on all blogs
    app.post('/populateComments', comments.populateComments);

}