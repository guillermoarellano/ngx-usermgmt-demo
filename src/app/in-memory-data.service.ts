import { InMemoryDbService, InMemoryBackendConfig } from 'angular-in-memory-web-api';

import { User } from './features/users/models/user.model';
import { Group } from './features/groups/models/group.model';

export class InMemoryDataService implements InMemoryDbService, InMemoryBackendConfig {
    createDb() {
        let users: User[] = [
            {
                id: 1,
                userName: 'Craig'
            },
            {
                id: 2,
                userName: 'Lisa'
            },
            {
                id: 3,
                userName: 'Terry'
            },
            {
                id: 4,
                userName: 'Januz'
            }
        ];
        let groups:Group[] = [
            {
                id: 1,
                groupName: 'Alpha',
                groupMembers: [1, 2, 3]
            },
            {
                id: 2,
                groupName: 'Beta',
                groupMembers: []
            },
            {
                id: 3,
                groupName: 'Charlie',
                groupMembers: [1]
            },
            {
                id: 4,
                groupName: 'Delta',
                groupMembers: []
            }
        ];

        return { users, groups };
    }
}
