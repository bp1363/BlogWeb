import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuotesService } from '../services/quotes.service';
import { Quote } from '../models/quote.model';

@Component({
  selector: 'app-qoutes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './qoutes.html',
  styleUrls: ['./qoutes.scss']
})
export class QoutesComponent implements OnInit {
  quotes: Quote[] = [];
  currentIndex = 0;

  constructor(private quotesService: QuotesService) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes() {
    this.quotesService.getQuotes().subscribe(data => {
      this.quotes = data;
      this.currentIndex = 0;
    });
  }

  get currentQuote(): Quote | null {
    return this.quotes.length ? this.quotes[this.currentIndex] : null;
  }

 goBack() {
  if (!this.quotes.length) return;
  if (this.currentIndex > 0) {
    this.currentIndex--;
  }
}

goNext() {
  if (!this.quotes.length) return;
  if (this.currentIndex < this.quotes.length - 1) {
    this.currentIndex++;
  }
}

}
