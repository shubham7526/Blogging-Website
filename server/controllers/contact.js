const { Contact: ContactService } = require('../services');

const save = async (req, res) => {
    try{
        const {body, headers: {authorization}} = req;
        const {doc} = await  ContactService.save(body, authorization);
        
        if(doc) {
            const {message, publicId} = doc;
            res.setHeader("message", message);
            res.setHeader("publicId", publicId);
            return res.postRequest();
        }  
        
        res.setHeader("message", "Not Send");
        return res.notFound();
    } catch(err){
        return res.serverError(err);
    }  
};

module.exports = { save };
