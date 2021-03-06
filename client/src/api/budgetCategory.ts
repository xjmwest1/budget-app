import BudgetCategory from 'budget-app-interface/models/BudgetCategory';
import ApiResponse from 'budget-app-interface/models/ApiResponse';

function getBudgetCategories(): Promise<BudgetCategory[]> {
    return fetch('/api/budgetCategory')
        .then((response) => {
            if (response.status !== 200) {
                throw Error();
            }

            return response;
        })
        .then(response => response.json())
        .then((body: ApiResponse) => {
            return body.contents;
        });
}

function postBudgetCategory(budgetCategory: BudgetCategory): Promise<BudgetCategory> {
    return fetch('/api/budgetCategory', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(budgetCategory)
        })
        .then(response => response.json())
        .then((body: ApiResponse) => {
            return body.contents;
        });
}

function updateBudgetCategory(budgetCategory: BudgetCategory): Promise<BudgetCategory> {
    return fetch('/api/budgetCategory', {
        method: 'update',
        body: JSON.stringify(budgetCategory)
    })
    .then(response => response.json())
    .then((body: ApiResponse) => {
        return body.contents;
    });
}

export {
    getBudgetCategories,
    postBudgetCategory,
    updateBudgetCategory
};
