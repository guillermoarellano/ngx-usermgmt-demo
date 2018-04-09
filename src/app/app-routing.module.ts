import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'users',
    loadChildren: 'app/features/users/user.module#UserModule'
  },
  {
    path: 'groups',
    loadChildren: 'app/features/groups/group.module#GroupModule'
  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
// TODO { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [
    WelcomeComponent
];
