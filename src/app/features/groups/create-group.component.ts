import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GroupService } from './services/group.service';
import { Group } from './models/group.model';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html'
})
export class CreateGroupComponent implements OnInit {

  constructor(private groupService: GroupService,
              private router: Router) { }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['groups']);
  }

  onSubmit(formValues) {
    const newGroup: Group = {
      id: 0,
      groupName: formValues.groupName,
      groupMembers: []
    };

    this.groupService.createGroup(newGroup).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );

    this.router.navigate(['groups']);
  }
}
