import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { Group } from '../groups/models/group.model';
import { GroupService } from '../groups/services/group.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  user: User = { id: 0, userName: ''};
  usersGroups: Group[];

  constructor(private groupService: GroupService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser(+this.route.snapshot.params['userId']).subscribe(
      (user) => {
        this.user = user;
        this.groupService.getGroups().subscribe(
          (groups) => {
            this.usersGroups = groups.filter(groups => groups.groupMembers.indexOf(this.user.id) !== -1);
          },
          (err) => console.log(err)
        );
      },
      (err) => console.log(err)
    );
  }

  cancel() {
    this.router.navigate(['users']);
  }

  goToUserMemberships() {
    this.router.navigate(['users', this.user.id, 'membership']);
  }

  onSubmit() {
    this.userService.updateUser(this.user).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );

    this.router.navigate(['users']);
  }
}
