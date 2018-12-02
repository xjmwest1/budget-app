import singleton from '../../decorators/singleton';
import UserGetRequest from './UserGetRequest';
import UserPutRequest from './UserPutRequest';
import FirebaseAdapter from '../../adapters/FirebaseAdapter';
import FirebaseTable from '../../adapters/FirebaseTable';
import User from '../../models/User';

class UserResolver {
    async get(request: UserGetRequest): Promise<User[]> {
        return FirebaseAdapter.getItems(FirebaseTable.Users)
            .then(items => items as User[])
            .then((users) => {
                if (request.userId) {
                    return users.filter(user => user.id == request.userId);
                }
                
                return users;
            });
    }

    async put(request: UserPutRequest): Promise<void> {
        return FirebaseAdapter.putItem(FirebaseTable.Users, request.user);
    }
}

export default singleton(UserResolver);
