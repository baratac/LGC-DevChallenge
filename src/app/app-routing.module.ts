import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsItemComponent } from './posts-item/posts-item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {path: '', component: PostsListComponent},
  {path: 'not-found-page', component: PageNotFoundComponent },
  {path: ':slug', component: PostsItemComponent},
  {path: '**', redirectTo: '/not-found-page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
