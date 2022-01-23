import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {Location} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {Router, Routes} from "@angular/router";
import { By } from '@angular/platform-browser';

import { PageNotFoundComponent } from './page-not-found.component';
import { PostsListComponent } from '../posts-list/posts-list.component';

const routes: Routes = [
  {path: '', component: PostsListComponent},
  {path: 'not-found-page', component: PageNotFoundComponent },
  {path: '**', redirectTo: '/not-found-page'}
];

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  let location: Location;
  let router: Router;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent, PostsListComponent ],
      imports: [ RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  });
  
  beforeEach(() =>  {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it(`should pass the message 'Page not Found`, () => {
    const fixture = TestBed.createComponent(PageNotFoundComponent);
    fixture.detectChanges();
    const { debugElement  } = fixture;
    const messageElement = debugElement.query(By.css('[data-testid="txt-not-found"]')).nativeElement as HTMLElement;
    expect(messageElement.innerText).toContain('Page not Found')
  });

  it('should offer a link to return to main page', () => {
    const fixture = TestBed.createComponent(PageNotFoundComponent);
    fixture.detectChanges();
    const { debugElement  } = fixture;
    const titleElement = debugElement.query(By.css('[data-testid="lnk-to-home"]')).nativeElement as HTMLElement;
    expect(titleElement.innerText).toContain('Back to List');
  });
  /*
 it('should return to root when the link is clicked', fakeAsync( () => {
    // WIP * Not valid solution so far

    const fixture = TestBed.createComponent(PageNotFoundComponent);
    fixture.detectChanges();
    const { debugElement  } = fixture;
    // Get DebugElements with an attached RouterLinkStubDirective
    const routerDe = debugElement.query(By.css('[data-testid="lnk-to-home"]'));
    console.log("Router DEbug ELement", routerDe);
    routerDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    router.navigate(['/gggjj']);
    tick();
    console.log("LOCATION PATH", location.path())
    expect(location.path()).toBe('');
  }));
  */
});
