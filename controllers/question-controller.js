/**
 * Controller to manage Questions
 */
let db = require('../models');

const Joi = require('joi')


const Questions =  {

/**
 * API to add questions
 * @param {*question,options} req 
 * @param {*} res 
 * @returns 
 */
    async Create(req, res) {


        const {question,options} = req.body;
        const schema = Joi.object({
            question: Joi.string().required(),
            count:Joi.number().positive(),
            options: Joi.array().items(Joi.object({
                answerText : Joi.string().required()
            }))
          })

          const {error,value} = schema.validate(req.body)

          if (error) {
              throw error.message
          }
        try {
                const data = await db.Questions.create({
                question: question,
                options:options
            }, {
                include: [db.Options]
            })
            return res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error })
        }


    },

    /**
     * API to update question under certain conditions
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async updateQuestion(req, res){
        
        const {id} =req.body
        const {question,options}=req.body
        try{

            const answer = await db.Answers.findOne({
                where: {
                    questionId:id
                }})
                if(answer == null){
                    const updateData = await db.Questions.update({
                        question:question
                    },{
                        where: {id:id}
                    }
                    )
                    return res.status(200).send(
                        {"true":updateData})
                }
                else{
                    return res.status(400).json({message:'Question already answered'})
                }
        }catch(error){
            res.status(500).json({ error })
        }
    },

/**
 * API to update options
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
    async updateOpitions(req, res){
       
        const {questionid,optionId,answerText}=req.body
        try{

            const answer = await db.Answers.findOne({
                where: {
                    questionId:questionid
                }})
                if(answer == null){
                    const updateOpition = await db.Options.update({
                        answerText:answerText
                    },{
                        where: {questionId: questionid, id: optionId},
                    }
                    )
                    return res.status(200).send(
                        {"true":updateOpition})
                }
                else{
                    return res.status(400).json({message:'Question already answered'})
                }
        }catch(error){
            res.status(500).json({ error })
        }
    },

    /**
     * View Questions
     * @param {*} req 
     * @param {*} res 
     */
    async viewQuestions(req, res){
        try{
            const data = await db.Questions.findAll({
                attributes: ['question', 'id']
            })
            
            res.status(200).json(data)
        }catch(error){
            res.status(500).json({ error })
        }
    },

    /**
     * View single questions
     * @param {*} req 
     * @param {*} res 
     */
    async viewSingleQuestions(req, res){
        try{
            const {id}=req.body
            const data = await db.Questions.findOne({
                attributes: ['question', 'id'],
                where:{id:id}
            })
            
            res.status(200).send(data)
        }catch(error){
            res.status(500).json({ error })
        }
    },

    /**
     * Remove Questions
     * @param {*} req 
     * @param {*} res 
     */
    async removeQuestion(req, res) {
        try{
            const {id}= req.body;
           const removeQuestion= await db.Questions.destroy({
               where: {id:id},
           })
            res.status(200).send({ message:"Question removed successfully" })
        }catch(error){
            res.status(500).json({ error})
        }
    },
   
}

module.exports =Questions