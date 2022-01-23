import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

import { CommentsListComponent } from './comments-list.component';
import { CommentItemList } from '../shared/data-types';

describe('CommentsListComponent', () => {
  let component: CommentsListComponent;
  let fixture: ComponentFixture<CommentsListComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  const testList: CommentItemList[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsListComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsListComponent);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;

    component.theList = testList;
    fixture.detectChanges();
  });

  it('should always present a button to add a new comment', () => {

    const { debugElement  } = fixture;;
    const submitButton = debugElement.query(By.css('.add-btn')).nativeElement as HTMLButtonElement;

    expect(submitButton).toBeTruthy();
  });

  it('should present update button when there is comments on the list', () => {
    const listItem: CommentItemList = {item: {user:'test-user', date:'2002-02-02', content:'test content' }, list: [] };
    testList.push(listItem);
    fixture.detectChanges();

    const { debugElement  } = fixture;
    const updateButton = debugElement.query(By.css('.updt-btn')).nativeElement as HTMLButtonElement;

    expect(updateButton).toBeTruthy();
  });

  it('should show comments content on the specific field', () => {
    const listItem: CommentItemList = {item: {user:'test-user', date:'2002-02-02', content:'test content' }, list: [] };
    testList.push(listItem);
    fixture.detectChanges();

    const { debugElement  } = fixture;
    const testContent = debugElement.query(By.css('[data-testid="content-field"]')).nativeElement as HTMLElement;
    expect(testContent.innerText).toContain(listItem.item.content);
  });
});
