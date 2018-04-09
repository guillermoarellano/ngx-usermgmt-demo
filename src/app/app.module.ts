import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CollapseModule } from 'ngx-bootstrap';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routedComponents } from './app-routing.module';
import { UserService } from './features/users/services/user.service';
import { GroupService } from './features/groups/services/group.service';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CollapseModule,
    AppRoutingModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    routedComponents,
  ],
  providers: [
    UserService,
    GroupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
