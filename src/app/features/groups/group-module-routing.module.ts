import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGroupComponent } from './create-group.component';
import { GroupDetailComponent } from './group-detail.component';
import { GroupMembersComponent } from './group-members.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [CreateGroupComponent, GroupDetailComponent, GroupMembersComponent]
})
export class GroupModuleRoutingModule { }
