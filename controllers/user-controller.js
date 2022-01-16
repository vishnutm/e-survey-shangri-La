

let db = require('../models/user');
let Helper = require('./helper');
let jwt = require("jsonwebtoken");
const fs = require('fs');

const Users={

  async create(req, res) {
      
    const { username, email, password, dob, address,SNI } = req.body;
    const hashPassword = Helper.hashPassword(password);
    
    db.User.findOne({
      where: { email: email }
    }).then((resp) => {
      if (resp == null) {
        db.User.create({
          username,
          email,
          password: hashPassword,
          dob,
          address,
          SNI,
          createdAt: Date.now()
        }).then(async (resp) => {
          resp.status(200).send({
              status: 'success',
              message:'User registered successfully'
          })
        })
      }
      else {
        res.status(400).send({
          status: false,
          message: 'User with same EMAIL already exists'
        });
      }
    }).catch((err) => {
      console.log(err);
    })
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send({ 'message': 'some values are missing' });
      }
      if (!Helper.isValidEmail(email)) {
        return res.status(400).send({ 'message': 'Please enter a valid email address' });
      }
      db.User.findOne({
        where: {
          email: email
        }
      }).then((userResp) => {
        if (userResp != null) {
          if (userResp.emailVerified) {
            if (!Helper.comparePassword(userResp.password, password)) {
              return res.status(400).send({ message: 'The credentials you provided is incorrect' });
            }
            // var data = img.replace(/^data:image\/\w+;base64,/, "");
            const token = Helper.generatetoken(userResp.id);
            const tokenCreated = updateOrCreate(db.Token,{userId:userResp.id, tokentype: 'session'},{verifyToken:token,userId:userResp.id,tokentype:'session'});
            if(tokenCreated){
              const user = {
                id: userResp.id,
                email: userResp.email,
                username: userResp.username,
                dob: userResp.dob,
                address: userResp.address,
                SNI: userResp.SNI
  
              }
              return res.status(200).send({ user, token });
            }
          }
          else {
            return res.status(400).send({ message: 'Please try to login after verifying your account' });
          }
        }
        else {
          return res.status(400).send({ message: 'No user has been enrolled using this credential' });
        }
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  },


}
module.exports = Users;