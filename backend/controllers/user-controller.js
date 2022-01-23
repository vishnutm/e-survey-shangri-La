/**
 * Controller for user management
 */
let db = require("../models");

const { Op } = require("sequelize");
let Helper = require("./helper");
let jwt = require("jsonwebtoken");
const fs = require("fs");
const Joi = require("joi");


const Users = {

  /**
   * API to generate SNI
   * @param {*sniNo} req 
   * @param {*message} res 
   */
  async gernerateSni(req, res) {
    try {
      const { sniNo } = req.body;
      const schema = Joi.object({
        sniNo: Joi.string().min(6).required(),
      });
      const { error, value } = schema.validate(req.body);

      if (error) {
        throw error.message;
      }
      await db.sni.findOne({//check existing api
        where: {
          sniNo: sniNo
        }
      }).then(async(respSni)=>{
        
        if(respSni==null) {
          await db.sni
        .create({
          sniNo,
        })
        .then((resp) => {
          return res.status(200).send({
            status: "success",
            data: resp,
            message: "SNI added",
          });
        });
        }
        else{
          return res.status(400).send({
            status: "success",
           
            message: "SNI could not add",
          });
        }
      })
     
    } catch (err) {
      throw err;
    }
  },

  /**
   * API To register users
   * @param {*username,email, password, dob, address, SNI} req 
   * @param {*message} res 
   */
  async create(req, res) {
    const { username, email, password, dob, address, SNI } = req.body;
    try {//validation code
      const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        dob: Joi.date().required(),
        address: Joi.string().required(),
        SNI: Joi.string().min(6).required(),
      });

      const { error, value } = schema.validate(req.body);

      if (error) {
        throw error.message;
      }
      const hashPassword = Helper.hashPassword(password);

      await db.User.findOne({
        where: {
          [Op.or]: [{ email: email }, { SNI: SNI }],
        },
      })
        .then(async (resp) => {
          if (resp == null) {
            await db.sni
              .findOne({
                where: {
                  sniNo: SNI,
                },
              })
              .then((responseSNI) => {
                if (responseSNI !== null) {
                  db.User.create({
                    username,
                    email,
                    password: hashPassword,
                    dob,
                    address,
                    SNI,
                    createdAt: Date.now(),
                  }).then(async (resp) => {
                    res.status(200).send({
                      status: "success",
                      data: resp.data,
                      message: "User registered successfully",
                    });
                  });
                } else {
                  return res.status(400).json({
                    status: false,
                    message: "SNI number does not exist",
                  });
                }
              });
          } else {
            res.status(400).send({
              status: false,
              message:
                "User with same email already exists or SNI already used",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      throw err;
    }
  },

  
/**
 * Logout user
 * @param {*userid} req 
 * @param {*message} res 
 */
  async logout(req, res) {
    const { userid } = req.body;
    db.Login.destroy({
      where: {
        userId: userid,
        tokentype: "session",
      },
    }).then((tokenRemove) => {
      if (tokenRemove == 1) {
        return res.status(200).send({ message: "Logout successfully" });
      } else {
        return res.status(400).send({ message: "Already logged out." });
      }
    });
  },

  /**
   * 
   * @param {list all user} req 
   * @param {*list of user} res 
   */
  async getAll(req, res) {
    try {
      const data = await db.User.findAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  /**
   * get single sni number
   * @param {*SNI} req 
   * @param {*message} res 
   */
  async singleSNI(req, res) {
    try {
      const { SNI } = req.body;
      const SniList = await db.User.findOne({
        where: { SNI: SNI }
      }).then(async(resp)=>{
        
        if(!resp) {
          
          await db.sni.findOne({
            where : { sniNo: SNI }
          }).then(async(SNIlistresponse)=>{
            
            if(SNIlistresponse){
              res.status(200).json({ status:true, message: "Can use SNI" });
            }else{
              res.status(200).json({ status:false,message: "SNI number does not exist" });
            }
          })
          
        } else {
         
          res.status(200).json({ 
            status:false,
            message: "SNI number already used" });
        }
      })
      
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  /**
   * check single mail
   * @param {*email} req 
   * @param {*message} res 
   */
  async singleEmail(req, res) {
    try {
      const { email } = req.body;
    
      const userEmail = await db.User.findOne({
        where: { email: email}
      }).then(async(resp)=>{
       
        if (resp == null) {
        
              res.status(200).json({ status:true,message: "Email can be used" });
            
          
        } else {
          res.status(200).json({ statue:false,message: "Email already used" });
        }
      })
      
    } catch (error) {
      res.status(500).json({ error });
    }
  },
 
/**
 * API to login user
 * @param {*username,password} req 
 * @param {*token} res 
 * @returns 
 */
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send({ message: "some values are missing" });
      }
      if (!Helper.isValidEmail(email)) {
        return res
          .status(400)
          .send({ message: "Please enter a valid email address" });
      }
      db.User.findOne({
        where: {
          email: email,
        },
      }).then((userResp) => {
        if (userResp != null) {
          if (!Helper.comparePassword(userResp.password, password)) {
            return res
              .status(400)
              .send({ message: "The credentials you provided is incorrect" });
          }

          const token = Helper.generatetoken(userResp.id);
          const tokenCreated = updateOrCreate(
            db.Login,
            { userId: userResp.id, tokentype: "session" },
            { verifyToken: token, userId: userResp.id, tokentype: "session" }
          );
          
          if (tokenCreated) {
            const user = {
              id: userResp.id,
              username: userResp.username,
              email: userResp.email,
              dob: userResp.dob,
              SNI: userResp.SNI,
            };
            return res.status(200).send({ user, token });
          }
        } else {
          return res
            .status(400)
            .send({
              message: "No user has been enrolled using this credential",
            });
        }
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

/**
 * Function to store session token
 * @param {*} model 
 * @param {*} where 
 * @param {*} newItem 
 * @returns 
 */
async function updateOrCreate(model, where, newItem) {
  return model.findOne({ where: where }).then(function (foundItem) {
    if (!foundItem) {
      // Item not found, create a new one
      return model.create(newItem).then(function (item) {
        return true;
      });
    }
    // Found an item, update it
    return model.update(newItem, { where: where }).then(function (item) {
      return true;
    });
  });
}

module.exports = Users;
