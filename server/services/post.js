const { v1: uuidV1 } = require('uuid');
const database = require('./../database');
const { post: PostModel } = database;
const { user: UserModel } = database;
const Helper = require("../utils/helper");


const save = async(payload)=>{
    const publicId  = uuidV1(); 
    const { userId, title, content, imageUrl } = payload;
    const response = await UserModel.findOne({where: {public_id: userId}});

    if(response){
        const {dataValues: {id}} = response;
        await PostModel.create({public_id: publicId, user_id: id, title, content, image_url: imageUrl});
    
        return {doc: {message: "Successfuly saved"}};
    }
    return {doc: {message: "Unauthorized person"}};

};

const getlistById = async(payload, authorization)=>{
    const {userId} = payload;
    const userDataResponse  = await UserModel.findOne({where: {public_id: userId}});

    if(userDataResponse){
        const {dataValues: {id}} = userDataResponse;
        const postResponse = await PostModel.findAll({
            where: {user_id: id},
            attributes: ["title", "content", "image_url", "public_id", "created_at"],
            order: [['created_at', 'DESC']],
            include: [{
                model: UserModel,
                attributes: ["name", "public_id"] 
            }]        
        });
    
        if(postResponse){
            const postList = postResponse.map(post => Helper.convertSnakeToCamel(post.dataValues))
            return {doc: postList}
        }    
        return {doc: {}}

    }
    return {doc: {message: "You are unauthorised person"}};

};

const getList = async()=>{
    const response = await PostModel.findAll({
        attributes: ["title", "content", "image_url", "public_id", "created_at"],
        order: [['created_at', 'DESC']],
        include: [{
            model: UserModel,
            attributes: ["name", "public_id"] 
        }]        
    });

    if(response){
        const postList = response.map(post => Helper.convertSnakeToCamel(post.dataValues))
        return {doc: postList}
    }    
    return {doc: {}}

};

const remove = async(payload)=>{
    const {userId, publicId} = payload;
    const response = await UserModel.findOne({where: {public_id: userId}});

    if(response){
        const {dataValues: {id}} = response;
        const postResponse = PostModel.findOne({where: {user_id: id}});
        if(postResponse){           
            await PostModel.destroy({where: {public_id: publicId}});
            return {doc: {message: "successfuly removed", publicId}};
        }
        return {doc: {message: "You are unauthorised person"}}

    }
    return {doc: {message: "You are unauthorised person"}}
};

module.exports = { save, getlistById, getList, remove };
