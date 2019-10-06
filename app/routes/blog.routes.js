module.exports = (app) => {
    const blogs = require('../controllers/blog.controller.js');

    console.log("in routes")
    // Create all 30k blogs
    app.post('/blogs', blogs.create);

}