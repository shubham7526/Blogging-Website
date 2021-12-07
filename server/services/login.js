const database = require('./../database');
const {user: UserModel} = database;
const  Helper = require('../utils/helper');

const login = async(payload)=>{
    const { password, email } = payload;
    const response = await UserModel.findOne({where: {email}});

    if(response){
        const {dataValues: {name, email, public_id: userId, password: storedPassword}} = response;

        if(storedPassword === password){
            const token = await Helper.createToken({email, userId});
            return {doc: {token, user: {name, email}}};
        }
        return {errors: [{name: "Invalid Email", message: "Invalid User Email"}]};;

    }
    return {errors: [{name: "Invalid Email", message: "Invalid User Email"}]};
};

module.exports = { login };