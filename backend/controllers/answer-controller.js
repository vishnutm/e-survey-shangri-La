/**
 * Controller to insert Answers
 */
let db = require("../models");

const Joi = require("joi");


const Answers = {
  /**
   * API to add answers to questions
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async createAnswers(req, res) {
    try {
      const { questionid, optionId, userId } = req.body;

      const data = await db.Answers.create({
        questionId: questionid,
        optionId:optionId,
        userId: userId
      }).then(async (response) => {
        
        if(response!= null){
          await db.Questions.update({
            attended:true

          },
          { 
            where: {id:response.questionId}
          }
          )
        }
      })
  
            return res.status(200).json({
              status:true,
              message:'Question Attended'
            });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  /**
   * API to get Answers
   * @param {*} req 
   * @param {*} res 
   */
  async getAnswers(req, res) {
    try {
      const { id } = req.body
      const dataCounts = await db.Questions.findOne({ where: { id }, attributes: ['id', 'question'], include: [{ model: db.Options, attributes: ['id'], include: [db.Answers]}]})
      const data = {
        id: dataCounts.id, 
        question: dataCounts.question,
        Answers: dataCounts.options.map((x)=>{
          return {
            id: x.id,
            count: x.answers.length
          }
        })
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
};
module.exports = Answers;
