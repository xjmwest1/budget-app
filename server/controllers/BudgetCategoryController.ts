import singleton from '../decorators/singleton';
import Controller from 'budget-app-interface/models/Controller';
import async from '../decorators/async';
import { Express, Request, Response } from 'express';
import BudgetCategoryResolver from './../resolvers/budgetCategory/BudgetCategoryResolver';
import BudgetCategory from 'budget-app-interface/models/BudgetCategory';

class BudgetCategoryController implements Controller {
    static PATH = '/api/budgetCategory';

    addEndpoints(app: Express) {
        app.route(BudgetCategoryController.PATH)
            .get(this.get())
            .post(this.put());
    }

    get() {
        return async(async (req: Request , res: Response) => {
            res.send({ contents: await BudgetCategoryResolver.get({}) });
        });
    }

    put() {
        return async(async (req: Request , res: Response) => {
            const budgetCategory = req.body as BudgetCategory;

            console.log(budgetCategory);

            res.send({ contents: await BudgetCategoryResolver.put({ budgetCategory }) });
        });
    }
}

export default singleton(BudgetCategoryController);
