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
      await db.Questions.findOne({ where: { id: id }, 
        attributes: ['id', 'question','options'], 
    
     //include: [db.Answers]
    })
     .then(async(resp)=>{
      //   console.log(resp)
       //res.status(200).json(resp)
       var arrob =[];
     //  await resp.options.forEach(element => {
         // console.log("",element)
         for await (const element of resp.options) {
        //   obj.push(QuestionItem["questionId"]);
        // }

       await db.Answers.findAll({
            where :{
              questionId:resp.id,
              optionId:element.id
            }
          }).then(async(answers) => {
            arrob.push(answers);
            //res.status(200).json(answers)
            
          })
       // });
       }
       // console.log("------",arrob)
        //res.status(200).json(arrob);
         const data = {
        //id: dataCounts.id, 
       // question: dataCounts.question,
        Answers: arrob.map((x)=>{
          console.log("vvv",x)
          if (x!=null){
            return {
              id: x.id,
              count: x['optionId']
            }
          }
          
        })
      }
      res.status(200).json({ data});
       })

      // const data = {
      //   id: dataCounts.id, 
      //   question: dataCounts.question,
      //   Answers: dataCounts.options.map((x)=>{
      //     return {
      //       id: x.id,
      //       count: x.answers.length
      //     }
      //   })
      // }
      //res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
};
module.exports = Answers;
