import singleton from '../../decorators/singleton';
import BudgetCategoryGetRequest from './BudgetCategoryGetRequest';
import BudgetCategoryPutRequest from './BudgetCategoryPutRequest';
import FirebaseAdapter from '../../adapters/FirebaseAdapter';
import FirebaseTable from '../../adapters/FirebaseTable';
import BudgetCategory from 'budget-app-interface/models/BudgetCategory';
import FirebaseModel from 'budget-app-interface/models/FirebaseModel';

class BudgetCategoryResolver {
    async get(request: BudgetCategoryGetRequest): Promise<BudgetCategory[]> {
        return FirebaseAdapter.getItems(FirebaseTable.BudgetCategories)
            .then(items => items as BudgetCategory[]);
        }

    async put(request: BudgetCategoryPutRequest): Promise<FirebaseModel> {
        return FirebaseAdapter.putItem(FirebaseTable.BudgetCategories, request.budgetCategory);
    }
}

export default singleton(BudgetCategoryResolver);
