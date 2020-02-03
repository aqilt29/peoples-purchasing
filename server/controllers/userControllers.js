//  controllers for users
const User = require('../../db/models/user');

module.exports = {
  createUser: async (req, res) => {
    let userData;
    let newUser

    const { body } = req;

    //  create user document
    try {
      newUser = await new User(body);
    } catch (error) {
      res.status(400).send(error)
    }

    //  save user document
    try {
      userData = await newUser.save()
    } catch (error) {
      res.status(400).send(error)
    }

    res.status(201).send(userData);
  },

  searchUsers: async (req, res) => {
    const { query } = req;
    let userData;

    //  try to lookup the user on email
    try {
      userData = await User.find(query);
    } catch (error) {
      res.status(404).send(error)
    }

    res.status(200).send(userData);
  },

  getAllUsers: async (req, res) => {
    let users;

    try {
      users = await User.find({});
    } catch (error) {
      res.status(400).send(error)
    }

    res.status(200).send(users);
  },

  modifyUser: async (req, res) => {
    res.send('TODO PATCH: modify user API')
  },
};