const express = require('express');
import async from './decorators/async';
import { Request, Response } from 'express';
import TransactionResolver from './resolvers/transaction/TransactionResolver';
import BudgetCategoryResolver from './resolvers/budgetCategory/BudgetCategoryResolver';

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/transactions', async(async (req: Request , res: Response) => {
    res.send({ contents: await TransactionResolver.get({}) });
}));

app.get('/api/budgetCategory', async(async (req: Request , res: Response) => {
    res.send({ contents: await BudgetCategoryResolver.get({}) });
}));


app.get('/api/:user/transactions', async(async (req: Request , res) => {
    const user = req.params['user'];
    res.send({ express: await TransactionResolver.get({ userId: user }) });
}));

app.get('/api/test', async(async (req, res) => {
    res.send({ express: await TransactionResolver.put({ transaction: { name: 'transaction', userId: 'john' } }) });
}));

app.listen(port, () => console.log(`Listening on port ${port}`));
