import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilInterfaceService {

  formState$ = new Subject<boolean>();
  private openForm = false;

  constructor() { 
    this.formState$.next(this.openForm);
  }

  /*
   * Utility handlers to control that only one form is available
   *  
   */
  openFormState() {
    if (!this.openForm) {
      this.openForm = true;
      this.formState$.next(this.openForm);
    }
  }

  closeFormState() {
    if (this.openForm) {
      
      this.openForm = false;
      this.formState$.next(this.openForm);
    }
  }
}
