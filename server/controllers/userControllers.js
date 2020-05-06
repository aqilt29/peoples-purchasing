//  controllers for users
const mongoose = require('mongoose')
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
      console.error(error)
      res.status(400).send(error)
    }

    //  save user document
    try {
      userData = await newUser.save()
    } catch (error) {
      console.error(error)
      res.status(400).send(error)
    }

    res.status(201).send(userData);
  },

  searchUsers: async (req, res) => {
    const { query } = req;
    console.log(`query from search users: ${query}`)
    let userData;

    //  try to lookup the user on email
    try {
      userData = await User.find(query);
    } catch (error) {
      console.log('error in search users', error)
      return res.status(404).send(error)
    }

    console.log(`search success ${userData}`)
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

  getAllApprovingUsers: async (req, res) => {
    let data = null;

    try {
      data = await User.where('role').ne('Employee')
    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }

    res.status(200).send(data)

  },

  modifyUser: async (req, res) => {
    res.send('TODO PATCH: modify user API')


  },

  getUserById: async (req, res) => {
    const { Id: id } = req.params
    let user;

    try {
      user = await User.findById(id)
    } catch (error) {
      res.status(400).send(error)
    }

    res.status(200).send(user);
  },
};