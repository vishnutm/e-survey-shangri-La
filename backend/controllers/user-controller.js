let db = require("../models");
// let sni = require('../models/sni');
// let sniNo = require('../models/sni');
let Helper = require("./helper");
let jwt = require("jsonwebtoken");
const fs = require("fs");
const Joi = require("joi");
const Users = {
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
      db.sni
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
    } catch (err) {
      throw new Error(err);
    }
  },

  async create(req, res) {
    const { username, email, password, dob, address, SNI } = req.body;

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

    db.User.findOne({
      where: {
        email: email,
      },
    })
      .then((resp) => {
        if (resp == null) {
          db.sni
            .findOne({
              where: {
                sniNo: SNI,
              },
            })
            .then((responseSNI) => {
              if (responseSNI.sniNo == SNI) {
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
                return res.status(400).send({
                  status: false,
                  message: "SNI number does not exist",
                });
              }
            });
        } else {
          res.status(400).send({
            status: false,
            message: "User with same EMAIL already exists",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async login(req, res) {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).json({ message: "All input is required" });
      }
      // Validate if user exist in our database
      const user = await db.User.findOne({
        where: { email: email },
      });

      if (user && (await Helper.comparePassword(user.password, password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.SECRET,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
        // save user token
        await db.User.update(
          {
            token: token,
          },
          {
            where: { email: email },
          }
        );

        // user
        res.status(200).json(user);
      }
      res.status(400).json({ message: "Invalid Credentials" });
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async loginAdmin(req, res) {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).json({ message: "All input is required" });
      }
      // Validate if user exist in our database
      const user = await db.Admin.findOne({
        where: { email: email },
      });

      // Create token
      const token = jwt.sign({ user_id: user._id, email }, process.env.SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      // save user token
      await db.Admin.update(
        {
          token: token,
        },
        {
          where: { email: email },
        }
      );

      // user
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  async logout(req, res) {
    const { userid } = req.body;
    db.Token.destroy({
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

  async getAll(req, res) {
    try {
      const data = await db.User.findAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  async singleSNI(req, res) {
    try {
      const { SNI } = req.body;
      const SniList = await db.User.findOne({
        where: { SNI: SNI },
      });
      if (SniList.SNI == null) {
        req.status(200).json({ message: "Can use SNI" });
      } else {
        req.status(400).json({ message: "SNI number already used" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  async loginAdmin(req, res) {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).json({ message: "All input is required" });
      }
      // Validate if user exist in our database
      const user = await db.Admin.findOne({
        where: { email: email },
      });

      // Create token
      const token = jwt.sign({ id: user.id, email }, process.env.SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      // save user token
      await db.Admin.update(
        {
          token: token,
        },
        {
          where: { email: email },
        }
      );

      // user
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
  },
  async createAdmin(req, res) {
    try {
      const { username, email, password } = req.body;

    //   const schema = Joi.object({
    //     username: Joi.string().required(),
    //     email: Joi.string().email().required(),
    //     password: Joi.string().required(),
    //   });

    //   const { error, value } = schema.validate(req.body);

    //   if (error) {
    //     throw error.message;
    //   }
      const hashPassword = Helper.hashPassword(password);

      db.Admin.create({
        username,
        email,
        password: hashPassword,
        createdAt: Date.now(),
      }).then(async (resp) => {
        res.status(200).send({
          status: "success",
          data: resp.data,
          message: "User registered successfully",
        });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = Users;
