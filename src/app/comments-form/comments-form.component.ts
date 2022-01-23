import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CommentData } from '../shared/data-types';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.scss']
})
export class CommentsFormComponent implements OnInit {
  @ViewChild('theForm') commentForm!: NgForm;
  @Input() theComment!: CommentData;
  @Output() theCommentChanged = new EventEmitter<CommentData>();

  constructor() { }

  ngOnInit(): void {
    if (this.theComment && this.theComment.user) {
      //
      // If there is data then it's an update set the initial values 
      // on the form set timeout, solution suggested by the Angular 
      // to allow the form object to be available to receive Input Values

      setTimeout(() => {
        this.commentForm.setValue({
          username: this.theComment!.user,
          comment: this.theComment!.content
        })
      }, 100)
    }
  }

  onSubmit(form: NgForm) {


    this.theComment!.user = form.value.username;
    this.theComment!.content = form.value.comment;
    this.theComment!.date = new Date().toLocaleDateString();
    //
    // get the values from the form value and send it back
    // to the parent component
    //
    this.theCommentChanged.emit(this.theComment);
    form.resetForm();
  }

  cancelComment(form: NgForm) {
    // 
    // Make sure data is incomplete as a way to inform 
    // the update/add operation was in fact canceled by the user
    this.theComment!.user = ''; 
    this.theCommentChanged.emit(this.theComment);
    form.resetForm();
  }
}
