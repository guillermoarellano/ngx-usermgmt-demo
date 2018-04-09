import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user.component';
import { UserDetailComponent } from './user-detail.component';
import { UserMembershipComponent } from './user-membership.component';
import { UsersListComponent } from './users-list.component';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path: 'new', component: CreateUserComponent },
  { path: ':userId/membership', component: UserMembershipComponent },
  { path: ':userId', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

export const routedUserComponents = [
  UsersListComponent,
  UserDetailComponent,
  CreateUserComponent,
  UserMembershipComponent
];
