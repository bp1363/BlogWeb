import { Component, OnInit } from '@angular/core';
import { ServicePdf, PdfDocument } from '../services/service.pdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-my-corner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-corner.html',
  styleUrls: ['./my-corner.scss']
})
export class MyCorner implements OnInit {

  pdfList: PdfDocument[] = [];
  filterText: string = '';
  selectedFile: PdfDocument | null = null;
  safeUrl: SafeResourceUrl | null = null;

  constructor(private servicePdf: ServicePdf, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadPdfs();
  }

  loadPdfs() {
    this.servicePdf.getAllPdfs().subscribe(data => {
      this.pdfList = data;
    });
  }

  filteredFiles(): PdfDocument[] {
    return this.pdfList.filter(f =>
      f.title.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  selectFile(file: PdfDocument) {
    this.selectedFile = file;
    if (this.getFileType(file.url) === 'PDF Document') {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getFullUrl(file.url));
    }
  }

  getFullUrl(url: string): string {
    return `${window.location.origin}${url}`;
  }

  getFileType(url: string): string {
    const ext = url.split('.').pop()?.toLowerCase();
    const types: Record<string, string> = {
      pdf: "PDF Document",
      jpg: "Image",
      jpeg: "Image",
      png: "Image",
      mp4: "Video",
      mov: "Video",
      avi: "Video",
      doc: "Word Document",
      docx: "Word Document"
    };
    return types[ext ?? ''] || "File"; // ✅ ext can be undefined
  }
  

  getFileIcon(url: string): string {
    const type = this.getFileType(url);
    switch(type) {
      case 'PDF Document': return '📄';
      case 'Image': return '🖼️';
      case 'Video': return '🎬';
      case 'Word Document': return '📃';
      default: return '📁';
    }
  }
}
