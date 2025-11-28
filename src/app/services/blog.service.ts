import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:5000/blogs';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBlog(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addBlog(blog: { title: string; content: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, blog);
  }
  // Update blog
  updateBlog(blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${blog.id}`, blog);
  }

  // Delete blog
  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
