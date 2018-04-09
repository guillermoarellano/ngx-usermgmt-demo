import { Component, OnInit } from '@angular/core';

import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { GroupService } from '../groups/services/group.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
  users: User[];

  constructor(private groupService: GroupService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (users) => this.users = users,
      (err) => console.log(err)
    );
  }

  deleteUser(userToDelete: User) {
    this.userService.removeUser(userToDelete.id).subscribe(
      () => {
        this.users = this.users.filter(items => items !== userToDelete);
        this.groupService.deleteUserFromAllGroups(userToDelete.id);
      },
      (err) => console.log(err)
    );
  }

  search(query: string) {
    // if empty search then get back all users
    if (query === '') {
      this.userService.getUsers().subscribe(
        (users) => this.users = users,
        (err) => console.log(err)
      );
    }
    // query back-end with search term
    this.userService.searchUsers(query)
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        (results) => this.users = results,
        (err) => console.log(err)
      );
  }
}
