import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { routedGroupComponents } from './group-routing.module';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    GroupRoutingModule
  ],
  declarations: [
    routedGroupComponents
  ]
})
export class GroupModule { }
