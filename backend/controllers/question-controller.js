/**
 * Controller to manage Questions
 */
let db = require("../models");

const Joi = require("joi");
const Op = require("sequelize").Op;

const Questions = {
  /**
   * API to add questions
   * @param {*question,options} req
   * @param {*} res
   * @returns
   */
  async Create(req, res) {


    const { question, options, count } = req.body;
    const schema = Joi.object({
      question: Joi.string().required(),
      count: Joi.number().positive(),
      options: Joi.array().items(
        Joi.object({
          id: Joi.number().positive().required(),
          answerText: Joi.string().required(),
        })
      ),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      throw error.message;
    }
    try {
      const data = await db.Questions.create({
        question: question,
        options: options,
      });
      return res.status(200).json({
        status:true,
        title:'Added!',
        message:"Question and Options added successfully"});
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  /**
   * API to update question under certain conditions
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async updateQuestion(req, res) {
    

    const { id } = req.body;
    const { question, options } = req.body;
    try {
      const data = await db.Questions.findOne({
        where: { id: id },
      });

      const updateData = db.Questions.update(
        {
          question: question,
          options: options,
        },
        {
          where: { id: id },
        }
      );
      return res.status(200).send({ 
        status:true,
        title:'Updated!',
        message:"Question and Options Updated successfully" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },


  /**
   * View Questions
   * @param {*} req
   * @param {*} res
   */
  async viewQuestions(req, res) {
    try {
      const data = await db.Questions.findAll({
        attributes: ["id", "question", "attended"],
        order: [["id", "DESC"]],
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  /**
   * View Questions
   * @param {*} req
   * @param {*} res
   */
  async viewUserQuestions(req, res) {
    try {
      var obj = [];
      const { userId } = req.body;
      const data = await db.Answers.findAll(
        {
          attributes: ["questionId"],
        },
        { where: { userId: userId } }
      ).then(async (response) => {
        
        if(response.length>0){
        for await (const QuestionItem of response) {
          obj.push(QuestionItem["questionId"]);
        }
      } else{
        obj = [0];
      }

        await db.Questions.findAll({
          attributes: {
            exclude: ["options", "attended", "createdAt", "updatedAt"],
          },
          order: [["id", "ASC"]],
          where: {
            [Op.not]: [{ id: obj }],
          },
        }).then(async (answers) => {
          res.send(answers);
        });
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * View single questions
   * @param {*} req
   * @param {*} res
   */
  async viewSingleQuestions(req, res) {
    try {
      const { id } = req.params;
      const data = await db.Questions.findOne({
        attributes: ["id","question", "options"],
        where: { id: id },
      });

      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * View single questions
   * @param {*} req
   * @param {*} res
   */
   async viewSingleUserQuestions(req, res) {
    try {
      const { id } = req.params;
      const data = await db.Questions.findOne({
        attributes: ["id","question", "options"],
        where: { id: id },
      });

      res.status(200).send(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * Remove Questions
   * @param {*} req
   * @param {*} res
   */
  async removeQuestion(req, res) {
    try {
      const { id } = req.params;
     
      const removeQuestion = await db.Questions.destroy({
        where: { id: id }
        
      }).then(async(response) =>{
        
        if(response==1){
          await db.Answers.destroy({
            where: { questionId: id }
          })
        }
      });
      res.status(200).send({ message: "Question removed successfully" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

module.exports = Questions;
