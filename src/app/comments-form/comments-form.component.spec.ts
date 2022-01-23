import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CommentsFormComponent } from './comments-form.component';

describe('CommentsFormComponent', () => {
  let component: CommentsFormComponent;
  let fixture: ComponentFixture<CommentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ CommentsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should start with invalid form and submit button disabled', async () => {
 
    await fixture.whenStable();

    fixture.detectChanges();
    const { debugElement  } = fixture;;
    const submitButton = debugElement.query(By.css('[data-testid="submit-btn"]')).nativeElement as HTMLButtonElement;

    expect(component.commentForm.invalid).toBeTruthy();   
    expect(submitButton.disabled).toBeTruthy();
  });


  it('should enable submit button when both fields are filled', async () => {
 
    await fixture.whenStable();

    const usernameField = component.commentForm.form.controls['username'];
    const commentField = component.commentForm.form.controls['comment'];

    usernameField.setValue('TestUsername');
    commentField.setValue('Test Comment');

    fixture.detectChanges();
    const { debugElement  } = fixture;;
    const submitButton = debugElement.query(By.css('[data-testid="submit-btn"]')).nativeElement as HTMLButtonElement;

    expect(component.commentForm.valid).toBeTruthy();   
    expect(submitButton.disabled).toBeFalsy();
  });

});
