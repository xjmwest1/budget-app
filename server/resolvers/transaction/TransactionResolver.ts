import singleton from '../../decorators/singleton';
import TransactionGetRequest from './TransactionGetRequest';
import TransactionPutRequest from './TransactionPutRequest';
import FirebaseAdapter from '../../adapters/FirebaseAdapter';
import FirebaseTable from '../../adapters/FirebaseTable';
import Transaction from 'budget-app-interface/models/Transaction';

class TransactionResolver {
    async get(request: TransactionGetRequest): Promise<Transaction[]> {
        return FirebaseAdapter.getItems(FirebaseTable.Transactions)
            .then(items => items as Transaction[]);
    }

    async put(request: TransactionPutRequest): Promise<void> {
        return FirebaseAdapter.putItem(FirebaseTable.Transactions, request.transaction);
    }
}

export default singleton(TransactionResolver);
