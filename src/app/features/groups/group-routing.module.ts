import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateGroupComponent } from './create-group.component';
import { GroupDetailComponent } from './group-detail.component';
import { GroupMembersComponent } from './group-members.component';
import { GroupsListComponent } from './groups-list.component';

const routes: Routes = [
  { path: '', component: GroupsListComponent },
  { path: 'new', component: CreateGroupComponent },
  { path: ':groupId/members', component: GroupMembersComponent },
  { path: ':groupId', component: GroupDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }

export const routedGroupComponents = [
  GroupsListComponent,
  GroupDetailComponent,
  CreateGroupComponent,
  GroupMembersComponent
];
