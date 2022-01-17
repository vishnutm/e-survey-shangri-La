let db = require('../models');

const Joi = require('joi')
const Questions =  {


    async Create(req, res) {


        const {question,options,count} = req.body;
        const schema = Joi.object({
            question: Joi.string().required(),
            count:Joi.number().positive(),
            opitions: Joi.array().items(Joi.object({
                text : Joi.string().required()
            }))
          })

          const {error,value} = schema.validate(req.body)

          if (error) {
              throw error.message
          }
        try {


            const question = await db.Questions.create({
                

            })
        } catch (error) {
            res.status(500).json({ error })
        }


    }
}



module.exports = Questions