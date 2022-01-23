import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { DataInterfaceService } from '../services/data-interface.service';
import { Post } from '../shared/data-types';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {

  postsList: Post[] = [];
  postsSubscription: Subscription | undefined;
  selectedPost: Post | undefined;

  constructor(private router: Router,
              private dataService: DataInterfaceService) { }

  ngOnInit(): void {

    this.postsSubscription = this.dataService.getPostsList().subscribe( data => {

      //
      // Data holds the list of posts
      this.postsList = data;
      //
      // Sort the posts list using Date.parse to guarantee the  the newest appears on top (at the beginning)
      this.postsList.sort((postA:Post, postB: Post) => (Date.parse(postB.publish_date) - Date.parse(postA.publish_date)));
      // console.log("The list is-:", this.postsList);
    })
  }

  // Clear the subscription on component OnDestroy LifeCycle
  //
  ngOnDestroy() {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }

  // On a post is seleceted use the slug string to route 
  // to the post page
  //
  postSelected(ev: MouseEvent, item: Post ) {
    this.selectedPost = item; // For tests purpose
    this.router.navigate([item.slug]);
  }

}
