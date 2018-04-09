import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from '../groups/models/group.model';
import { GroupService } from '../groups/services/group.service';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styles: [`
    .active {
      color: white;
      background-color: #28a745; //TODO: Use bootstrap $success variable
    }
  `]
})
export class CreateUserComponent implements OnInit {
  chosenGroupIds: number[] = [];
  groups: Group[];

  constructor(private groupService: GroupService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    // get all Groups defined in the database
    this.groupService.getGroups().subscribe(
      (resp) => this.groups = resp,
      (err) => console.log(err)
    );
  }

  cancel() {
    this.router.navigate(['users']);
  }

  updateChecked(chosenGroup: Group, event: any) {
    // TODO: Figure how to use Event type instead of 'any'
    // if the box is checked/unchecked, we only update the in-memory array.
    if (event.target.checked) {
      // push the selected group's id to array of group ids
      this.chosenGroupIds.push(chosenGroup.id);
    } else {
      // filter the selected group id out of array of group ids
      this.chosenGroupIds = this.chosenGroupIds.filter(ids => ids !== chosenGroup.id);
    }
  }

  onSubmit(formValues) {
    const newUser: User = {id: 0, userName: ''};
    newUser.userName = formValues.userName;

    // add the new user, and after getting newly created
    // id from database, loop through chosen group id's
    // to add user into each of those groups
    this.userService.addUser(newUser).subscribe(
      (createdUser) => {
        this.chosenGroupIds.forEach(groupId =>
          this.groupService.addUserIntoGroup(createdUser.id, groupId)
        );
      },
      (err) => console.log(err)
    );

    this.router.navigate(['users']);
  }
}
