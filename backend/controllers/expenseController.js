const Expense = require('../models/expenseModule');
const mongoose = require('mongoose');

//get all expenses

const getAllExpenses = async ( req , res ) => {
    const expenses = await Expense.find({}).sort({createdAt: -1});
    res.status(200).json(expenses);
}

const getOneExpense = async ( req , res ) => {
    const {title} = req.params
    const expense = await Expense.findOne({title})
    res.status(200).json(expense)
}

const insertExpenses = async ( req , res) => {
    const {title , cost , description} = req.body;
    try {
        const expense = await Expense.create({title , cost , description});
        res.status(200).json(expense);
    }
    catch (error) {
        res.status(400).json({error : error.message})
    }
}

const deleteExpense = async( req , res ) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Expense'})
    }

    const expense = await Expense.findOneAndDelete({_id: id})

    if(!expense)
    {
        return res.status(400).json({error: 'No such Expense'})
    }

    res.status(200).json(expense)
}

const updateExpense = async( req , res ) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such expense'})
    }
    const expense = await Expense.findOneAndUpdate( {_id : id} , {
        ...req.body 
    })
    if(!expense)
    {
        return res.status(400).json({error: 'No such expense'})
    }
    res.status(200).json(expense)
}
module.exports = {
    getAllExpenses,
    insertExpenses,
    deleteExpense,
    updateExpense
}