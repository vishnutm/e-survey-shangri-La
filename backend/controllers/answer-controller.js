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
      const { id } = req.body;
      let attendedUsers=0;
      const question = await db.Questions.findOne({where: {id: id}, attributes: ['id', 'question', 'options']});
      const answers = await db.Answers.findAll({where: {questionId: id}, attributes: ['questionId', 'optionId']});
      if(question && answers){
        question.options.map((x)=> {
          const item = x;
          
          item['count'] = answers.filter((y)=> y.optionId === x.id).length
          
          attendedUsers=attendedUsers+item['count']
          return item;
        });
        

        return res.status(200).json({status: true, data: question,TotalCount:attendedUsers});
      }
    } catch (error) {
   
      res.status(500).json({ error });
    }
  }
};
module.exports = Answers;
