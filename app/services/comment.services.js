const Blog = require('../models/blog.model');
const User = require('../models/user.model');
require('../models/comment.model');

let commentServices = {};

commentServices.populateFirstLevelUsers = async blogHeading => {
  const blog = await Blog.findOne({ heading: blogHeading }).populate('comments').exec();

  const userPromiseArray = [];

  blog.comments.forEach(comment => {
    const user = User.findOne({ _id: comment.user }).exec();
    userPromiseArray.push(user);
  });

  const users = await Promise.all(userPromiseArray);

  const updatedUsersArray = [];

  for(let i = 0; i < users.length; i++) {
    const userToUpdate = users[i];
    let isUpdated = false;
    for(let j = 0; j < users.length; j++) {
      if(i !== j) {
        if(!userToUpdate.firstLevelFriends.includes(users[j]._id)) {
          userToUpdate.firstLevelFriends.push(users[j]._id);
          isUpdated = true;
        }
      }
    }
    if(isUpdated) {
      updatedUsersArray.push(userToUpdate);
    }
  }

  const savedUsersPromises = updatedUsersArray.map(user => user.save());

  return await Promise.all(savedUsersPromises);
}

module.exports = commentServices;