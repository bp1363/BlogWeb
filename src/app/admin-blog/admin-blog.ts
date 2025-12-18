import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog.model';
import { QuotesService } from '../services/quotes.service';
import { Quote } from '../models/quote.model';
import { ErrorLoggingService } from '../services/error-logging-service';
import { PdfDocument, ServicePdf } from '../services/service.pdf';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-blog.html',
  styleUrls: ['./admin-blog.scss'],
})
export class AdminBlogComponent implements OnInit {

  // BLOG
  blogs: Blog[] = [];
  title = '';
  content = '';
  editBlogData: Blog | null = null;

  // QUOTES
  quotes: Quote[] = [];
  quoteText = '';
  quoteAuthor = '';
  editQuoteData: Quote | null = null;

  // PDF / Image / Video
  pdfForm: PdfDocument = { title: '', url: '' };
  pdfList: PdfDocument[] = [];
  editPdfData: PdfDocument | null = null;

  selectedType: 'blog' | 'quote' | 'file' = 'blog'; // default selection

  constructor(
    private blogService: BlogService,
    private quotesService: QuotesService,
    private errorLoggingService: ErrorLoggingService,
    private servicePdf: ServicePdf
  ) {
    this.errorLoggingService.getError();
  }

  ngOnInit(): void {
    this.loadBlogs();
    this.loadQuotes();
    this.loadPdfs();
  }

  // ===== BLOG METHODS =====
  loadBlogs() {
    this.blogService.getBlogs().subscribe((data) => (this.blogs = data));
  }

  saveBlog() {
    if (!this.title || !this.content) return;
    if (this.editBlogData) {
      this.blogService.updateBlog({ ...this.editBlogData, title: this.title, content: this.content })
        .subscribe(() => { this.loadBlogs(); this.resetBlogForm(); });
    } else {
      this.blogService.addBlog({ title: this.title, content: this.content })
        .subscribe(() => { this.loadBlogs(); this.resetBlogForm(); });
    }
  }

  editBlog(blog: Blog) {
    this.editBlogData = blog;
    this.title = blog.title;
    this.content = blog.content;
  }

  deleteBlog(id: number) {
    this.blogService.deleteBlog(id).subscribe(() => this.loadBlogs());
  }

  resetBlogForm() {
    this.title = '';
    this.content = '';
    this.editBlogData = null;
  }

  // ===== QUOTE METHODS =====
  loadQuotes() {
    this.quotesService.getQuotes().subscribe((data) => (this.quotes = data));
  }

  saveQuote() {
    if (!this.quoteText || !this.quoteAuthor) return;
    if (this.editQuoteData) {
      this.quotesService.updateQuote(this.editQuoteData.id, { text: this.quoteText, author: this.quoteAuthor })
        .subscribe(() => { this.loadQuotes(); this.resetQuoteForm(); });
    } else {
      this.quotesService.addQuote({ text: this.quoteText, author: this.quoteAuthor })
        .subscribe(() => { this.loadQuotes(); this.resetQuoteForm(); });
    }
  }

  editQuote(quote: Quote) {
    this.editQuoteData = quote;
    this.quoteText = quote.text;
    this.quoteAuthor = quote.author;
  }

  deleteQuote(id: number) {
    this.quotesService.deleteQuote(id).subscribe(() => this.loadQuotes());
  }

  resetQuoteForm() {
    this.quoteText = '';
    this.quoteAuthor = '';
    this.editQuoteData = null;
  }

  // ===== PDF / IMAGE / VIDEO METHODS =====
  loadPdfs() {
    this.servicePdf.getAllPdfs().subscribe((data) => (this.pdfList = data));
  }

  savePdf() {
    if (!this.pdfForm.title || !this.pdfForm.url) return alert('Enter both title and URL');

    if (this.editPdfData) {
      // UPDATE
      this.servicePdf.updatePdf(this.editPdfData.id!, this.pdfForm).subscribe(() => {
        this.resetPdfForm();
        this.loadPdfs();
      });
    } else {
      // ADD NEW
      this.servicePdf.addPdf(this.pdfForm).subscribe(() => {
        this.resetPdfForm();
        this.loadPdfs();
      });
    }
  }

  editPdf(pdf: PdfDocument) {
    this.editPdfData = pdf;
    this.pdfForm = { ...pdf };
  }

  deletePdf(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.servicePdf.deletePdf(id).subscribe(() => this.loadPdfs());
    }
  }

  resetPdfForm() {
    this.pdfForm = { title: '', url: '' };
    this.editPdfData = null;
  }

  getFileType(url: string): string {
    const ext = url.split('.').pop()?.toLowerCase();
    if (!ext) return 'Other';
    if (['pdf'].includes(ext)) return 'PDF';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'Image';
    if (['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext)) return 'Video';
    return 'Other';
  }

}
