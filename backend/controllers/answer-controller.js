let db = require("../models");

const Joi = require("joi");
const Answers = {
  async createAnswers(req, res) {
    try {
      const { questionid, Answers, userid } = req.body;

      // const {error,value} = schema.validate(req.body)

      // if (error) {
      //     throw error.message
      // }

      const data = await db.Answers.create({
        questionId: questionid,
        answers: Answers,
        userId: userid,
      });
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  async getAnswers(req, res) {
      try{
         const {id} = req.body
         const dataCount = await db.Answers.findAndCountAll({
            attributes: {
                exclude: ['createdAt','updatedAt','userId'] ,
                
                    
                
            },
            
            where: {
                questionId:id
            }
         }
           
         )
         res.status(200).json({ dataCount})
      }catch (error) {
        res.status(500).json({ error });
      }
  }
};
module.exports = Answers;
