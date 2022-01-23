import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import {  DataInterfaceService } from '../services/data-interface.service';
import { PostsListComponent } from './posts-list.component';
import { routes } from '../app-routing.module';

import testData from '../testing/test-db.json';

describe('PostsListComponent', () => {
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let router: Router;
  let thePostList: jasmine.Spy;

  const postsTestList = testData.posts;
  const dataService = jasmine.createSpyObj('DataInterfaceService', ['getPostsList']);
  thePostList = dataService.getPostsList.and.returnValue(of(postsTestList));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsListComponent ],
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      providers: [
          {
            provide: DataInterfaceService,
            useValue: dataService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create 10 comment entries', () => {
    const { debugElement  } = fixture;
    const postsElementList = debugElement.queryAll(By.css('[data-testid="post-item-btn"]'));
    //
    // there 10 posts on the data available used for testing
    expect(postsElementList.length).toBe(10);

    // expect(component).toBeTruthy();
  });

  it ('shoud run post selected event handler when button is clicked', () => {
    spyOn(component, 'postSelected');
    const { debugElement  } = fixture;
    const postsElementList = debugElement.queryAll(By.css('[data-testid="post-item-btn"]'));
    const postElementItem = postsElementList[1].nativeElement as HTMLButtonElement;
    postElementItem.click();
    fixture.detectChanges();
    expect(component.postSelected).toHaveBeenCalled();
  });

  it ('shoud deliver the post information when post button is clicked', () => {
    const { debugElement  } = fixture;
    const postsElementList = debugElement.queryAll(By.css('[data-testid="post-item-btn"]'));
    const postElementItem = postsElementList[1].nativeElement as HTMLButtonElement;
    postElementItem.click();
    fixture.detectChanges();
    expect(component.selectedPost!.id).toBe(9); // The latests posts are the first on list
  });
});
