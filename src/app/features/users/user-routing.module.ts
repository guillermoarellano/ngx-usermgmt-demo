import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user.component';
import { UserDetailComponent } from './user-detail.component';
import { UserMembershipComponent } from './user-membership.component';
import { UsersListComponent } from './users-list.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [CreateUserComponent, UserDetailComponent, UserMembershipComponent, UsersListComponent]
})
export class UserRoutingModule { }
