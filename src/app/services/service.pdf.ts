import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PdfDocument {
  id?: number;
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicePdf {
  private baseUrl = 'http://localhost:5000/api/pdfs';

  constructor(private http: HttpClient) {}

  addPdf(pdf: PdfDocument): Observable<PdfDocument> {
    return this.http.post<PdfDocument>(`${this.baseUrl}/add`, pdf);
  }

  getAllPdfs(): Observable<PdfDocument[]> {
    return this.http.get<PdfDocument[]>(`${this.baseUrl}/list`);
  }

  updatePdf(id: number, pdf: PdfDocument): Observable<PdfDocument> {
    return this.http.put<PdfDocument>(`${this.baseUrl}/update/${id}`, pdf);
  }

  deletePdf(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/delete/${id}`);
  }
}
