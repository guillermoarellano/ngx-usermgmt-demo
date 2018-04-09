import { TestBed, async } from '@angular/core/testing';
import { CollapseModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { routedComponents } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';



import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CollapseModule.forRoot(),
        AppRoutingModule
      ],
      declarations: [
        AppComponent,
        routedComponents
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'User Management App'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('User Management App');
  }));
});
