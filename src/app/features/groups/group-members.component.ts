import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Group } from './models/group.model';
import { User } from '../users/models/user.model';
import { GroupService } from './services/group.service';
import { UserService } from '../users/services/user.service';

@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styles: [`
    .active {
      color: white;
      background-color: #28a745; //TODO: Use bootstrap $success variable
    }
  `]
})
export class GroupMembersComponent implements OnInit {
  routeId: string;
  group: Group;
  users: User[];

  constructor(private groupService: GroupService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params['groupId'];
    // get the group to edit users membership
    this.groupService.getGroup(+this.routeId).subscribe(
      (data) => this.group = data,
      (err) => console.log(err)
    );
    // get all users defined in the database
    this.userService.getUsers().subscribe(
      (resp) => this.users = resp,
      (err) => console.log(err)
    );
  }

  cancel() {
    this.router.navigate(['groups', this.routeId]);
  }

  updateChecked(userId: number, event: any) {
    // TODO: Figure how to use Event type instead of 'any'
    // if the box is checked/unchecked, we only update the in-memory array.
    if (event.target.checked) {
      this.group.groupMembers.push(userId);
    } else {
      this.group.groupMembers = this.group.groupMembers.filter(items => items !== userId);
    }
  }

  onSubmit() {
    // update database once user done editing users' membership in Group
    this.groupService.updateGroup(this.group).subscribe(
      () => true,
      (err) => console.log(err)
    );

    // go back to group details screen
    this.router.navigate(['groups', this.routeId]);
  }

}
