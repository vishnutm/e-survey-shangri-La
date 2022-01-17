

let db = require('../models');
// let sni = require('../models/sni');
// let sniNo = require('../models/sni');
let Helper = require('./helper');
let jwt = require("jsonwebtoken");
const fs = require('fs');
const Joi = require('joi')
const Users = {

async gernerateSni(req, res){
    const {sniNo} = req.body;
    const schema = Joi.object({
        sniNo :joi.string().min(8).required()
    });
    const { error, value } = schema.validate(req.body)

    if (error) {
        throw error.message
    }
    db.sni.SNIList.create({
        sniNo
    }).then((resp)=>{
        res.status(200).send({
            status: 'success',
            data:resp.data,
            message: 'SNI added'
        })
    })
},


    async create(req, res) {

        const { username, email, password, dob, address, SNI } = req.body;
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            dob : JOi.date().required(),
            address: Joi.string().required(),
            SNI : Joi.string().min(8).required()
        });

        const { error, value } = schema.validate(req.body)

            if (error) {
                throw error.message
            }
        const hashPassword = Helper.hashPassword(password);

        db.User.findOne({
            where: { email: email }
        }).then((resp) => {
            if (resp == null) {
                sniNo.SNIList.findOne({
                    where:{
                        sniNo:SNI
                    }
                }).then((responseSNI) => {
                    if ((responseSNI.sniNo ==SNI)&&(responseSNI.status==false)){
                        db.User.create({
                            username,
                            email,
                            password: hashPassword,
                            dob,
                            address,
                            SNI,
                            createdAt: Date.now()
                        }).then(async (resp) => {
                            res.status(200).send({
                                status: 'success',
                                data:resp.data,
                                message: 'User registered successfully'
                            })
                        })
                    }
                    else {
                        res.status(400).send({
                            status: false,
                            message: 'SNI number does not exist'
                        });
                    }
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

            const schema = Joi.object({

                email: Joi.string().email().required(),
                password: Joi.string().required()
            });

            const { error, value } = schema.validate(req.body)

            if (error) {
                throw error.message
            }

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
                    
                        if (!Helper.comparePassword(userResp.password, password)) {
                            return res.status(400).send({ message: 'The credentials you provided is incorrect' });
                        }
                        // var data = img.replace(/^data:image\/\w+;base64,/, "");
                        const token = Helper.generatetoken(userResp.id);
                        const tokenCreated = updateOrCreate(db.Token, { userId: userResp.id, tokentype: 'session' }, { verifyToken: token, userId: userResp.id, tokentype: 'session' });
                        if (tokenCreated) {
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
                    return res.status(400).send({ message: 'No user has been enrolled using this credential' });
                }
            })
        } catch (error) {
            return res.status(400).send(error)
        }
    },


    async logout(req,res){
        const {userid} = req.body;
        db.Token.destroy({
          where:{
            userId: userid,
            tokentype: 'session'
          }
        }).then((tokenRemove)=>{
          if(tokenRemove==1){
            return res.status(200).send({message: 'Logout successfully'})
          }
          else{
            return res.status(400).send({message: 'Already logged out.'})
          }
        })
      },
   
    
    async getAll(req, res) {

        try {
            const data = await db.User.findAll()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error })
        }


    }

}
module.exports = Users;