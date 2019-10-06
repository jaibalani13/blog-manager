const User = require('../models/user.model.js');

exports.generateUsers = async (req, res) => {
  let userPromises = [];
  for(let i=0; i<50000; i++) {
    const randomName = 'name: ' + i;
    const randomPhoneNumber = '1234' + i;

    const user = new User({
      name: randomName,
      phone: randomPhoneNumber
    });

    const userPromise = user.save();

    userPromises.push(userPromise);
  }

  try {
    await Promise.all(userPromises);
  } catch(error) {
    res.status(400).send('Unable to create users');
  }

  res.status(201).send('Users created');
};
