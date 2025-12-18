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
  sidebarOpen: boolean = true;

  constructor(
    private servicePdf: ServicePdf,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadPdfs();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  loadPdfs() {
    this.servicePdf.getAllPdfs().subscribe(data => {
      this.pdfList = data;
    });
  }

  openInNewTab(url: string) {
    window.open(url, '_blank');
  }
  

  filteredFiles(): PdfDocument[] {
    return this.pdfList.filter(file =>
      file.title.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  selectFile(file: PdfDocument) {
    this.selectedFile = file;

    // IMPORTANT: External URL → use as-is
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(file.url);
  }

  getFileType(url: string): string {
    const cleanUrl = url.toLowerCase().split('?')[0]; // remove query params
  
    // IMAGE detection (extension + known CDNs)
    if (
      cleanUrl.endsWith('.jpg') ||
      cleanUrl.endsWith('.jpeg') ||
      cleanUrl.endsWith('.png') ||
      cleanUrl.endsWith('.gif') ||
      cleanUrl.endsWith('.webp') ||
      url.includes('bing.com/th/id') ||
      url.includes('pixelstalk.net') ||
      url.includes('unsplash.com') ||
      url.includes('pexels.com')
    ) {
      return 'Image';
    }
  
    // PDF
    if (cleanUrl.endsWith('.pdf')) {
      return 'PDF Document';
    }
  
    // Video
    if (
      cleanUrl.endsWith('.mp4') ||
      cleanUrl.endsWith('.mov') ||
      cleanUrl.endsWith('.avi')
    ) {
      return 'Video';
    }
  
    // Word
    if (
      cleanUrl.endsWith('.doc') ||
      cleanUrl.endsWith('.docx')
    ) {
      return 'Word Document';
    }
  
    return 'File';
  }
  

  getFileIcon(url: string): string {
    const type = this.getFileType(url);
    switch (type) {
      case 'PDF Document': return '📄';
      case 'Image': return '🖼️';
      case 'Video': return '🎬';
      case 'Word Document': return '📃';
      default: return '📁';
    }
  }


}
