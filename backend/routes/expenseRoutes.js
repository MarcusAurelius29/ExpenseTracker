const express = require('express')

const {getAllExpenses, insertExpenses, deleteExpense , updateExpense} = require('../controllers/expenseController');

const router = express.Router();

router.get('/' , getAllExpenses);

router.post('/' , insertExpenses);

router.delete('/:id' , deleteExpense);

router.patch('/:id' , updateExpense);

module.exports = router