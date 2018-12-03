enum FirebaseTable {
    Transactions,
    Users,
    BudgetCategories
}

export interface FirebaseTableInfo {
    name: string;
}

export function getFirebaseTableInfo(table: FirebaseTable): FirebaseTableInfo {
    switch (table) {
        case FirebaseTable.Transactions:
            return { name: 'transactions' };
        case FirebaseTable.Users:
            return { name: 'users' };
        case FirebaseTable.BudgetCategories:
            return { name: 'budgetCategories' };
    }
}

export default FirebaseTable;
