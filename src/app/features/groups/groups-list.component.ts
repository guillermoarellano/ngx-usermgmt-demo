import { Component, OnInit } from '@angular/core';

import { Group } from './models/group.model';
import { GroupService } from './services/group.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html'
})
export class GroupsListComponent implements OnInit {
  groups: Group[];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe(
      (groups) => this.groups = groups,
      (err) => console.log(err)
    );
  }

  removeGroup(groupToDelete: Group) {
    this.groupService.deleteGroup(groupToDelete.id).subscribe(
      () => this.groups = this.groups.filter(items => items !== groupToDelete),
      (err) => console.log(err)
    );
  }

  search(query: string) {
    // if empty search then get back all Groups
    if (query === '') {
      this.groupService.getGroups().subscribe(
        (users) => this.groups = users,
        (err) => console.log(err)
      );
    }
    // query back-end with search term
    this.groupService.searchGroups(query)
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        (results) => this.groups = results,
        (err) => console.log(err)
      );
  }

}
