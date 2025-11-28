import {RouterModule, Routes, ExtraOptions } from '@angular/router';
import { NgModule } from '@angular/core';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { BlogListComponent } from './blog-list/blog-list';
import { About } from './about/about';
import { BlogDetailComponent } from './blog-detail/blog-detail';
import { AdminBlogComponent } from './admin-blog/admin-blog';
import { adminGuard } from './guards/auth.guard';
import { QoutesComponent } from './qoutes/qoutes';
import { MyCorner } from './my-corner/my-corner';
import { Error } from './error/error';

export const routes: Routes = [
  { path: '', component: Home },          
  { path: 'blog-list', component: BlogListComponent },
  {path:'about', component:About},
  {path:'qoutes', component:QoutesComponent},
  { path: 'blog/:id', component: BlogDetailComponent },
  // { path: 'admin-blog', component: AdminBlogComponent }, 
  {path : 'admin-blog' , component:AdminBlogComponent, canActivate : [adminGuard]},
  {path:'mycorner' ,component:MyCorner},
  { path: 'contact', component: Contact },
  {path:'error' , component:Error},
  { path: '**', redirectTo: '' }  
];


// Scroll options
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'top',  
  anchorScrolling: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }