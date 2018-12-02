import Timestamp from 'budget-app-interface/models/Timestamp';
import Transaction from 'budget-app-interface/models/Transaction';
import ApiResponse from 'budget-app-interface/models/ApiResponse';

function getTransactions(startTimestamp?: Timestamp, endTimestamp?: Timestamp): Promise<Transaction[]> {
    return fetch('/api/transactions')
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

export default getTransactions;
