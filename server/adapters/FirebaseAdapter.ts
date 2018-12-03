import firebase from 'firebase';
import singleton from '../decorators/singleton';
import FirebaseTable, { FirebaseTableInfo, getFirebaseTableInfo } from './FirebaseTable';
import FirebaseModel from 'budget-app-interface/models/FirebaseModel';

class FirebaseAdapter {
    private database: firebase.database.Database;

    constructor() {
        const config = {
            apiKey: "AIzaSyBX9HEW-VmkGev0PHbPxw5ch6mx_eafRdc",
            authDomain: "budget-app-940bd.firebaseapp.com",
            databaseURL: "https://budget-app-940bd.firebaseio.com",
            storageBucket: "budget-app-940bd.appspot.com",
        };

        firebase.initializeApp(config);
        this.database = firebase.database();
    }

    async getItems(table: FirebaseTable): Promise<any[]> {
        const tableInfo: FirebaseTableInfo = getFirebaseTableInfo(table);

        return await this.database.ref(tableInfo.name).once('value').then((snapshot) => {
            return FirebaseAdapter.snapshotToArray(snapshot);
        });
    }

    async putItem(table: FirebaseTable, item: FirebaseModel): Promise<FirebaseModel> {
        const tableInfo: FirebaseTableInfo = getFirebaseTableInfo(table);
        
        if (item.id) {
            return this.updateItem(tableInfo, item).then(() => item );
        }

        console.log(item);
        const newItemRef = this.database.ref(tableInfo.name).push();
        return newItemRef.set(item);
    }

    private updateItem(tableInfo: FirebaseTableInfo, item: FirebaseModel): Promise<void> {
        const itemRef = this.database.ref(`${tableInfo.name}/${item.id}`);
        // TODO: remove properties that dont need updating
        return itemRef.update(item);
    }

    private static snapshotToArray(snapshot: firebase.database.DataSnapshot): any[] {
        const val: any = snapshot.val() || {};
        return Object.values(val);
        // return Object.entries(snapshot).map(e => Object.assign(e[1], { key: e[0] }));
    }
}

export default singleton(FirebaseAdapter);
