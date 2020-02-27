const mongoose = require('mongoose')
const Entity = require('../../db/models/entity');

module.exports = {
  getAllEntities: async (req, res) => {

    let listOfEntities;

    try {
      console.log('fetching all entities')
      listOfEntities = Entity.find();
    } catch (error) {
      return res.status(500).send(error)
    }

    res.status(200).send(listOfEntities);
  }
}
