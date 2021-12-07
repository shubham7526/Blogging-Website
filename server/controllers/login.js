const { Login: LoginService } = require('../services');

const login = async(req, res) =>{
    try{
        const { body } = req;
        const {doc} = await LoginService.login(body);
        
        if(doc) {
            const {token, user} = doc;
            res.setHeader("token", token);
            return res.postSuccessfully({doc: {...user}});
        }   
        res.setHeader("message", "Login failed");
        return res.unAuthorized();

    }catch(err){
        return res.serverError(err);
    }
}

module.exports = { login };