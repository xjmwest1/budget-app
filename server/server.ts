import express from 'express';
import BudgetCategoryController from './controllers/BudgetCategoryController';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

BudgetCategoryController.addEndpoints(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
