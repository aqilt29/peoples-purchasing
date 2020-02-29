require('dotenv').config();
const mongoose = require('mongoose');
const connectDb = require('./db')
const Entity = require('./db/models/entity');
const entityList = require('./server/reference/listOfEntities');

connectDb().then((db) => {
  console.log('DB for seed connected');

  entityList.forEach(async (entity) => {
    console.log(entity);

    let entityToInsert = new Entity(entity);

    try {
      console.log('saving entity')
      await entityToInsert.save()
    } catch (error) {
      console.error(error)
    }

  })

})
