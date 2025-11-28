import { Component, OnInit } from '@angular/core';
import { PdfDocument, ServicePdf } from '../services/service.pdf';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-corner',
  imports: [CommonModule],
  templateUrl: './my-corner.html',
  styleUrl: './my-corner.scss'
})
export class MyCorner  implements OnInit{

  pdfList: PdfDocument[] = [];

  constructor(private servicePdf: ServicePdf) {}

  ngOnInit(): void {
    this.loadPdfs();
  }

  loadPdfs() {
    this.servicePdf.getAllPdfs().subscribe(data => this.pdfList = data);
  }

}
