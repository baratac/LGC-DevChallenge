import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {  DataInterfaceService } from '../services/data-interface.service'
import { Post,  CommentItemList } from  '../shared/data-types';

@Component({
  selector: 'app-posts-item',
  templateUrl: './posts-item.component.html',
  styleUrls: ['./posts-item.component.scss']
})
export class PostsItemComponent implements OnInit, OnDestroy {
  thePost: Post | undefined;
  commentList: CommentItemList[] | undefined = []; 
  slugRef = '';
  postsSubscription: Subscription | undefined;
  commentsSubscription: Subscription | undefined;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataInterfaceService) { }

  ngOnInit(): void {

    this.slugRef = this.route.snapshot.params['slug'];
    // The URL defined in the router module as the slug parameter
    // and used to find the right post information
    //
    this.postsSubscription = this.dataService.getPostsList().subscribe( data => {
      //
      // Data returns list of posts
      const postsList = data;
      //
      // Search the posts for the with the selected slug reference
      this.thePost = postsList.find((postA:Post) => (postA.slug === this.slugRef));
      
      if (this.thePost) {
          // If a posts is found then request the comments list
          // 
          this.dataService.getPostComments(this.thePost.id);
          // Subscribe to the commentsList, when the results are received
          // they will be provide on this dataService observable
          // by keeping the subscription any new update on the list
          // will be provided by the data service  
          this.commentsSubscription = this.dataService.getCommentsList().subscribe( theList => {
            this.commentList = theList;
          });
      } 
      else {
        // If no post was found with the slug string identifier
        // then move back to the posts list after some time to 
        // show information about wrong address 
        // setTimeout( () => { this.router.navigate(['/']) }, 5000)
      }
    })
  }

  ngOnDestroy() {

    // Clear the subscriptions before finish the component 
    //
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
  }
  
  // Handler trigger by the return to the list button
  //
  gotoList() {
    this.router.navigate(['/'])
  }

  // Handler to the button thar allows manually refresh of
  // the comment list (not necessary, just in case of doubt)  
  // 
  refreshComments() {
    if (this.thePost) {
      this.dataService.getPostComments(this.thePost.id);
    } 
  }
}
