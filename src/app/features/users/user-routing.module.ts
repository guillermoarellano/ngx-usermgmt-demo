import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user.component';
import { UserDetailComponent } from './user-detail.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [CreateUserComponent, UserDetailComponent]
})
export class UserRoutingModule { }
