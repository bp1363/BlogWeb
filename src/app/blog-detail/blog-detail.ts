import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // <-- add Router here
import { BlogService } from '../services/blog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.scss']
})
export class BlogDetailComponent implements OnInit {
  blog: any;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router    // now Router is recognized
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlog(id).subscribe(data => {
      this.blog = {
        ...data,
        createdAt: data.createdAt ? new Date(data.createdAt) : null
      };
    });
  }

  // Go back to blog list
  goBack() {
    this.router.navigate(['/blog-list']);
  }
}
