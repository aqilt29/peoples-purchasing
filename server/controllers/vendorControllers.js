//  controllers for the vendors data
const Vendor = require('../../db/models/vendor');

module.exports = {
  createVendor: async (req, res) => {
    const { body } = req;
    console.log(body);

    let newVendor;
    let vendorData;

    try {
      console.log('attempting to create new vendor')
      newVendor = await new Vendor(body);

    } catch (error) {
      console.error(`error making new vendor ${error}`)
      return res.status(500).send(error);
    }

    try {
      console.log(`attempting to save new vendor`)
      vendorData = await newVendor.save()

    } catch (error) {
      console.error(`error saving new vendor ${error}`)
      return res.status(500).send(error);
    }

    res.status(201).send(vendorData);
  },

  getAllVendors: async (req, res) => {
    let vendorData;

    try {
      console.log('fetching the vendors')
      vendorData = await Vendor.find({ isDeleted: false });
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }

    res.status(200).send(vendorData)
  },

  getVendorById: async (req, res) => {
    const { params: { id } } = req;

    let vendorData;

    try {
      console.log('trying to fetch vendor')
      vendorData = await Vendor.findById(id);
    } catch (error) {
      return res.status(500).send(error);
    }

    res.status(200).send(vendorData)
  },

  modifyVendor: async (req, res) => {
    const { body, params: { id } } = req;

    res.status(200).send({ body, id })
  },

  searchVendors: async (req, res) => {},

  deleteVendor: async (req, res) => {
    const { params: { id } } = req;
    let vendorData;

    try {
      console.log('trying to fetch vendor for deletion')
      vendorData = await Vendor.findById(id);
    } catch (error) {
      return res.status(500).send(error);
    }

    vendorData.isDeleted = true;
    vendorData.markModified('isDeleted');

    try {
      console.log('trying to save vendor as deleted')
      await vendorData.save()
    } catch (error) {
      return res.status(500).send(error);
    }

    res.status(201).send(vendorData)
  },
}