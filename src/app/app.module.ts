import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsItemComponent } from './posts-item/posts-item.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentsFormComponent } from './comments-form/comments-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    PostsItemComponent,
    CommentsListComponent,
    CommentsFormComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
