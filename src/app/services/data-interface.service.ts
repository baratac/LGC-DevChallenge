import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject,  Subject, catchError } from 'rxjs';


import { Post, Comment, CommentItemList } from '../shared/data-types';

const postsUrl = 'http://localhost:9000/posts';
const commentsURL = 'http://localhost:9000/comments';

@Injectable({
  providedIn: 'root'
})
export class DataInterfaceService {

  private postsList$ = new BehaviorSubject<Post[]>([]);
  private commentsList$ = new Subject<CommentItemList[]>() 

  private commentsList: CommentItemList[] = [];

  constructor(private http: HttpClient) { 
    
    // Make request to get blog Post List
    // Then feed the result on the postsList Subject
    //
    this.http.get<Post[]>(postsUrl).subscribe({
      next: data => { this.postsList$.next(data) },
      error: err => { this.handleError(err) } 
    });
  
  }
  
  getPostsList(): BehaviorSubject<Post[]> {
    return this.postsList$;
  }

  getCommentsList(): Subject<CommentItemList[]> {
    return this.commentsList$;
  }

  // Handler to issue the http request of get list of comments 
  // for the post passed as parameter.
  // After receiving the response, calls function that builds the
  // which will provide  layered comments structure more
  // suitable for rendering the comments hiearchy 
  //
  getPostComments(postId: number): void {
    const theURL = postsUrl + '/' + postId + '/comments';

    this.http.get<Comment[]>(theURL).subscribe({ 
      next: responseData => {
        this.commentsList = this.buildCommentsStructure(responseData);
        this.commentsList$.next(this.commentsList) },
      error: err => this.handleError(err)
    });
  }
  //
  // Handler Funtion that issues a post request that will
  // create a new comment for a given post, if the operation
  // is successful the response provides the new comment object
  // that will be inserted in the existing comment structure
  // an then the commentsList subject is updated to let the updated 
  // structure be rendered.  
  //
  addComment(postId: number, commentData: Comment) {
    const theURL = postsUrl + '/' + postId + '/comments';

    console.log(`Add Comment on Post ${postId}`, commentData);
    this.http.post<Comment>(theURL, commentData).subscribe(data => {
      console.log("ResultIS", data);
      if (data.id != undefined) {
        
        this.insertComment(data, this.commentsList);
        this.commentsList$.next(this.commentsList);
      }
    });
  }
  //
  // Http handler to issu a PUT request that will update a 
  // given comment, as in the add comment, if the operation is
  // successful the new object representing the updated comments
  // is returned, then the existing representation of the comment
  // in the comment lists structure is search and updated accordingly
  // finnaly the commentsList Subject is updated allowing the result
  // to ne rendered by the subscribing component.
  //
  updateComment(commentId: number, commentData: Comment ) {
    const theURL = commentsURL + '/' + commentId;
    this.http.put<Comment>(theURL, commentData).subscribe( data => {
      if (data.id != undefined) {
        
        const refElem = this.findComment(data.id as number, this.commentsList);
        if (refElem) {
          refElem.item.content = data.content;
          refElem.item.user = data.user;
          refElem.item.date = data.date;
          this.commentsList$.next(this.commentsList);
        }
      }
    });
  }

  // --------------------------
  // Simple Error Handler
  // 
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
  }
  //-----------------------------------------------------------------
  // Private  helper methods to build and handle comments 
  // internal structure
  //
  private buildCommentsStructure(data: Comment[]): CommentItemList[]  {
    const commentList: CommentItemList[] | undefined = [];
   
    data.forEach( (element: Comment) => {
      this.insertComment(element, commentList);
    })
    return commentList;
  }
  //
  // Add Comment in the internal comment structure
  //
  private insertComment(newElement: Comment, theList: CommentItemList[]) {
    //
    // The comment object on the internal structure, holds it's on comments
    // on an array, and so on, the top list is an array of this objects that
    // will hold the comments with parent_id = null 
    const newItem: CommentItemList = {
      item: newElement,
      list: []
    };

    let refElem: CommentItemList | undefined;
    if (!newElement.parent_id) {
      theList.push(newItem);
    } else {
      //
      // If the parent-id is not null, then must locate the parent id item
      // as this comment belonds to its list of comments
      refElem = this.findComment(newElement.parent_id, theList);
      if (refElem) {
        refElem.list!.push(newItem);
      }
    }

  }
  //
  // Find Comment in the internal comment structure using
  // a recursive function given the adopted layered structure
  private findComment(id: number, list: CommentItemList[] | undefined): CommentItemList | undefined  {

    if (list) {

      let theRef = list.find(elem => elem.item.id === id);
      //
      // If the comment is found then the quest is over
      if (!theRef) {
        //
        // Otherwise check if there are inner lists at this level to dive in

        list.forEach( v => {
          if (!theRef) {
            theRef = this.findComment(id, v.list);
          }
        });
      }
      return theRef;
    }
    return undefined;
  }

}
