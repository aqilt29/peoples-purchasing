const mongoose = require('mongoose')
const Entity = require('../../db/models/entity');

module.exports = {
  getAllEntities: async (req, res) => {

    let data;

    try {
      console.log('fetching all entities')
      data = await Entity.find();

    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }

    res.status(200).send(data);
  }
}
