const { v1: uuidV1 } = require('uuid');
const database = require('./../database');
const { contact: ContactModel } = database;
const Helper = require("../utils/helper")

const save = async (payload, authorization) => {
    const publicId = uuidV1(); 
    const {name, mobileNumber, email, message} = payload;
    await ContactModel.create({public_id: publicId, name, mobile_number: mobileNumber, email, message})

    return {doc : {message: 'successfully send', publicId}}
};

module.exports = { save };
