let db = require('../models');

const Joi = require('joi');

const Questions = {
    async Create(req, res) {
        const { question, options, count } = req.body;
        const schema = Joi.object({
            question: Joi.string().required(),
            count: Joi.number().positive(),
            options: Joi.array().items(Joi.object({
                answerText: Joi.string().required()
            }))
        })

        const { error, value } = schema.validate(req.body)

        if (error) {
            throw error.message
        }
        try {
            const data = await db.Questions.create({
                question: question,
                options: options
            }, { include: [db.Options] })
            return res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error })
        }
    },
    async updateQuestion(req, res) {

        const { id } = req.body
        const { question, options } = req.body
        try {

            const data = await db.Questions.findOne({
                where: { id: id }
            })

            const updateData = db.Questions.update({
                question: question
            }, {
                where: { id: id }
            })
            return res.status(200).send({ updateData })
        } catch (error) {
            res.status(500).json({ error })
        }
    },
    async updateOption(req, res) {

        const { questionId, optionId } = req.body
        const { question, options } = req.body
        try {

            const data = await db.Questions.findOne({
                where: { id: id }
            })

            const updateData = db.Questions.update({
                question: question
            }, {
                where: { id: id }
            })
            return res.status(200).send({ updateData })
        } catch (error) {
            res.status(500).json({ error })
        }
    },
    async viewQuestions(req, res) {
        try {
            const data = await db.Questions.findAll()
            res.status(200).send(data)
        } catch (error) {
            res.status(500).json({ error })
        }
    },
    async removeQuestion(req, res) {
        try {
            const { id } = req.body;
            const removeQuestion = await db.Questions.destroy({
                where: { id: id },
            })
            res.status(200).send({ message: "Question removed successfully" })
        } catch (error) {
            res.status(500).json({ error })
        }
    }
}



module.exports = Questions