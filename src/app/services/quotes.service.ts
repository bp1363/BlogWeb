import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';

@Injectable({ providedIn: 'root' })
export class QuotesService {
  // Change this to your Railway backend URL
  private apiUrl = 'https://myblog-production-a3d4.up.railway.app/api/quotes';

  constructor(private http: HttpClient) {}

  // Get all quotes
  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.apiUrl);
  }

  // Add a new quote
  addQuote(quote: Partial<Quote>): Observable<Quote> {
    return this.http.post<Quote>(this.apiUrl, quote);
  }

  // Update an existing quote
  updateQuote(id: number, quote: Partial<Quote>): Observable<Quote> {
    return this.http.put<Quote>(`${this.apiUrl}/${id}`, quote);
  }

  // Delete a quote
  deleteQuote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
