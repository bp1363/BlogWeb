import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule,MatCardModule,MatButtonModule,],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.scss']
})
export class BlogListComponent implements OnInit {
  blogs: any[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
  this.blogService.getBlogs().subscribe(
    (data: any[]) => {
      this.blogs = data
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    },
    (error) => {
      console.error('Error fetching blogs:', error);
    }
  );
}
}
