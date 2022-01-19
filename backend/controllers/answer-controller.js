let db = require("../models");

const Joi = require("joi");
const Answers = {
  async createAnswers(req, res) {
    try {
      const { questionid, Answers, userid } = req.body;
      const schema = Joi.object({
        questionid: Joi.number().required(),
        
      })
      const {error,value} = schema.validate(req.body)

      if (error) {
          throw error.message
      }

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
         const dataCount = await db.Answers.findAll({
            attributes: {
                exclude: ['createdAt','updatedAt','userId'] ,
                
                    includes:['questionId','answers']
                
            },
            
            where: {
                questionId:id

            }
         }
           
         )
         let i=0,j=0,k = 0;
          dataCount.map(data =>{
          
            if(data.answers==1)
              i++;
              else if(data.answers==2)
              j++;
              else if(data.answers==3)
              k++;
         })
         const dataCounts={
          "Question":id,
          "Answers":[
          {
          "id":"1",
          "count":i
          },
          {
          "id":"2",
          "count":j
          },
          {
          "id":"3",
          "count":k
          }
          ]
         }
         res.status(200).json(dataCounts);
      }catch (error) {
        res.status(500).json({ error });
      }
  }
};
module.exports = Answers;
