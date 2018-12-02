import UserId from './UserId';
import FirebaseModel from './FirebaseModel';

class Transaction extends FirebaseModel {
    name: string;
    userId: UserId;
}

export default Transaction;
