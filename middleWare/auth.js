/**
 * Middleware to check authentication
 */
const jwt = require('jsonwebtoken');

let db = require('../models');

const Auth = {
    
    /**
     * verify Token
     * @param {object} req 
     * @param {object} res
     * @param {object} next
     * @returns {object|void} response object
     */
    async verifyToken(req, res, next) {
        const token = req.headers['x-access-token'];
        console.log('token',token);
        console.log('ENV',process.env.SECRET)
        if(!token) {
          return res.status(400).send({ 'message': 'Token is not provided' });
        }
        try {
          const decoded = await jwt.verify(token, process.env.SECRET);
          db.User.findOne({
            where:{
              token: token,
              
            }
          }).then((tokenResp)=>{
            if(tokenResp!=null){
              next();
            }
            else{
              return res.status(400).send({ 'message': 'The token you provided is invalid' });
            }
          }).catch((err)=>{
            return res.status(400).send({ 'message': 'The token you provided is invalid' });
          })
        // return {};
        } catch(error) {
            console.log("Error=", error);
            
          return res.status(400).send({message: 'Invalid token'});
        }
      }
    }

module.exports = Auth;
