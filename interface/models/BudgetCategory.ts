import MoneyAmount from './MoneyAmount';
import Timestamp from './Timestamp';
import FirebaseModel from './FirebaseModel';

class BudgetCategory extends FirebaseModel {
    title: string;
    amount: MoneyAmount;
    startTimestamp: Timestamp;
    endTimestamp: Timestamp;
}

export default BudgetCategory;
