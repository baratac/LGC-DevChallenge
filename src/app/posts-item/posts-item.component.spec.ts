import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import {  DataInterfaceService } from '../services/data-interface.service';
import { PostsItemComponent } from './posts-item.component';
import testData from '../testing/test-db.json';
import { routes  } from '../app-routing.module';

describe('PostsItemComponent', () => {
  let component: PostsItemComponent;
  let fixture: ComponentFixture<PostsItemComponent>;
  // let router: Router;
  let thePostList: jasmine.Spy;

  beforeEach(async () => {
    const postsTestList = testData.posts;
    const dataService = jasmine.createSpyObj('DataInterfaceService', ['getPostsList']);
    thePostList = dataService.getPostsList.and.returnValue(of(postsTestList));

    await TestBed.configureTestingModule({
      declarations: [ PostsItemComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientTestingModule ],
      providers: [ 
        {
          provide: ActivatedRoute, 
          useValue: { snapshot: {params:{slug: 'blog-post-2'}}},
        },
        {
          provide: DataInterfaceService,
          useValue: dataService
        } 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsItemComponent);
    // router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get sllug ref from the url', () => {

    expect(component.slugRef).toBe('blog-post-2');
  });

  it('should be able to find a post with id 2', () => {

    expect(component.thePost?.id).toEqual(2);
  });
  
});

describe('PostsItemComponent on wrong address', () => {
  let component: PostsItemComponent;
  let fixture: ComponentFixture<PostsItemComponent>;
  let thePostList: jasmine.Spy;

  beforeEach(async () => {
    const postsTestList = testData.posts;
    const dataService = jasmine.createSpyObj('DataInterfaceService', ['getPostsList']);
    thePostList = dataService.getPostsList.and.returnValue(of(postsTestList));
    await TestBed.configureTestingModule({
      declarations: [ PostsItemComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientTestingModule ],
      providers: [ 
        {
          provide: ActivatedRoute, 
          useValue: { snapshot: {params:{slug: 'unknown-slug'}}},
        },
        {
          provide: DataInterfaceService,
          useValue: dataService
        } 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get the slug parameter with unknown address', () => {

    expect(component.slugRef).toBe('unknown-slug');
  });

  it('should find no posts for this address', () => {

    expect(component.thePost).toBeFalsy();
  });
  
  it('should pass the message no post to show', () => {
    const { debugElement  } = fixture;
    const messageElement = debugElement.query(By.css('[data-testid="unknown-post-address"]')).nativeElement as HTMLElement;
    expect(messageElement.innerText).toContain('Nothing To Show Here...')
  });

  it('should offer a link to main page', () => {
    const { debugElement  } = fixture;
    const linkElement = debugElement.query(By.css('[routerLink="/"]')).nativeElement as HTMLElement;
    expect(linkElement).toBeTruthy();
  });
});
