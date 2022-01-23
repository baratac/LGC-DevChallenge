import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentItemList, Comment, CommentData } from '../shared/data-types';
import { DataInterfaceService } from '../services/data-interface.service';
import { UtilInterfaceService } from '../services/util-interface.service';
 
@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})

export class CommentsListComponent implements OnInit, OnDestroy {
  @Input() theList: CommentItemList[] | undefined;
  @Input() parentId: number | undefined;
  @Input() postId: number | undefined;
  @Input() depth: number = 0;


  currentComment: CommentData = {user: '', date: '', content:''};
  currentId: number | undefined = 0;
 
  formStateSubscrition: Subscription | undefined;
  // Flag used the open form control to make sure only one form  is open
  //
  openForm: boolean = false;
  
  // Flag controls the add new comment form display
  //
  addContent: boolean = false;
  //
  // List of flags one for each update form, one for each comment
  formUpdate: boolean[] = [];

  //
  // Variables used to dinamically change the background of 
  // the comments based on their depth
  commentStyle = "p-2 my-3 border-2 border-stone-400 rounded-lg ";
  commentBackground = ['bg-cyan-50','bg-neutral-50'];

  constructor(private dataService: DataInterfaceService,
              private utilService: UtilInterfaceService) { }

  ngOnInit(): void {
    if (this.theList) {
      //
      // Each instance of this component receives a list of comments
      // there will be one of this components for each layer of comments
      // starting with the comments to the post and then comments of comments...
      // For each comment there is a form hidden until the update
      // button is pressed, to prevent multiple forms to appear
      // and to just show the one associated to the comment to update
      // this array is used and set to false on Init. 
      this.formUpdate = new Array(this.theList!.length).fill(false);
    }

    //
    // Solution to prevent multiple forms to be open, the aproach was to use
    // reactivity through a subject to inform the open form status, disabling
    // the buttons that trigger the openning of a form.  
    this.formStateSubscrition = this.utilService.formState$.subscribe( val => {
      this.openForm = val;
    })
    //
    // Switch the backround depending on the comments level
    this.commentStyle += this.commentBackground[ this.depth%2 ]; 
  }

  ngOnDestroy() {
    if (this.formStateSubscrition) {
      this.formStateSubscrition.unsubscribe();
    }
  }

  //
  // Unlocks the form for a new comment to be added
  addComment() {

    this.addContent = true;
    this.utilService.openFormState();
  }

  //
  // Unlocks the form to update the comment updates
  // currentComment property to be passed to the form 
  // component wigh the current values
  updateComment(item: Comment, commentIndex: number) {

    this.utilService.openFormState();

    this.currentId = item.id;
    this.currentComment.user = item.user;
    this.currentComment.content = item.content;
    this.formUpdate[commentIndex] = true;
  }

  //
  //  Custom event handler of the result from the form interaction
  //  if the user is not present it's assumed that the user cancelled
  //  the comment  interaction and no action is done
  onSubmit(theData: any, idx: number | undefined ) {

    let theComment: Comment = {user: '', date: '', content:''};

 
    //
    // Signal the end of Form activity
    this.utilService.closeFormState();
    //
    // Process the data returned, start by checking if the form was cancelled
    //
    if (theData && theData.user) { 
      theComment = {...theData};
      theComment.postId = this.postId;
      theComment.parent_id = this.parentId === undefined ? null : this.parentId;

      if (this.addContent) {
        // If addContent Flag is on then it's a result of new comment
        this.dataService.addComment(this.postId as number, theComment);
        this.addContent = false;
      }
      //
      // If the idx is returned then the venet comes from an update operation
      if (idx != undefined) { // This is an indication of update comment operation

        this.dataService.updateComment(this.theList![idx].item.id as number, theComment);
      }
    }
    //
    // Clear the flags to hide the form.

    if (idx != undefined) {
      this.formUpdate[idx] = false;
    } else {
      this.addContent = false;
    }
    this.currentComment = {user: '', date: '', content:''};  
  }
}
