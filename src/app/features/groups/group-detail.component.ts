import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GroupService } from './services/group.service';
import { Group } from './models/group.model';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html'
})
export class GroupDetailComponent implements OnInit {
  group: Group = {
    id: 0,
    groupName: '',
    groupMembers: []
  };

  constructor(private groupService: GroupService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.groupService.getGroup(+this.route.snapshot.params['groupId']).subscribe(
      (group) => this.group = group,
      (err) => console.log(err)
    );
  }

  cancel() {
    this.router.navigate(['groups']);
  }

  goToGroupMembers() {
    this.router.navigate(['groups', this.group.id, 'members']);
  }

  onSubmit() {
    this.groupService.updateGroup(this.group).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );

    this.router.navigate(['groups']);
  }

}
