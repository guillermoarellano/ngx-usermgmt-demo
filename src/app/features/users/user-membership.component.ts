import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Group } from '../groups/models/group.model';
import { User } from './models/user.model';
import { GroupService } from '../groups/services/group.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user-membership',
  templateUrl: './user-membership.component.html',
  styles: [`
    .active {
      color: white;
      background-color: #28a745; //TODO: Use bootstrap $success variable
    }
  `]
})
export class UserMembershipComponent implements OnInit {
  editedGroupsIndexArray: number[] = [];
  groups: Group[];
  routeId: string;
  user: User;

  constructor(private groupService: GroupService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.routeId = this.route.snapshot.params['userId'];
    // get the User to edit membership
    this.userService.getUser(+this.routeId).subscribe(
      (data) => this.user = data,
      (err) => console.log(err)
    );
    // get all Groups defined in the database
    this.groupService.getGroups().subscribe(
      (resp) => this.groups = resp,
      (err) => console.log(err)
    );
  }

  cancel() {
    this.router.navigate(['users', this.routeId]);
  }

  updateChecked(editedGroup: Group, event: any) {
    // TODO: Figure how to use Event type instead of 'any'
    // if the box is checked/unchecked, we only update the in-memory array.
    if (event.target.checked) {
      // push the user id to updated group's members array
      editedGroup.groupMembers.push(this.user.id);
    } else {
      // filter the user id out of updated group's members array
      editedGroup.groupMembers = editedGroup.groupMembers.filter(ids => ids !== this.user.id);
    }

    // find the index in the Groups array of objects and replace with updated group object
    const itemIndex = this.groups.findIndex(item => item.id === editedGroup.id);
    this.groups[itemIndex] = editedGroup;

    // track which index of the Groups array of objects was edited
    if (!this.editedGroupsIndexArray.includes(itemIndex)) {
      this.editedGroupsIndexArray.push(itemIndex);
    }
  }

  onSubmit() {
    // traverse array tracking edits and call groupService method to update
    // Group at this.groups[index]
    this.editedGroupsIndexArray.forEach(indexItem =>
      // update database once done editing user's groups membership
      this.groupService.updateGroup(this.groups[indexItem]).subscribe(
        () => true,
        (err) => console.log(err)
      )
    );

    // go back to user details screen
    this.router.navigate(['users', this.routeId]);
  }

}
