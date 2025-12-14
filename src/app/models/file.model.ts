export interface AppFile {
    id?: number;
    title: string;
    url: string;        // relative or absolute URL to file (e.g. /uploads/abcd.pdf)
    type?: string;      // mime type like 'application/pdf' or 'image/png'
    size?: number;      // bytes
    createdAt?: string; // ISO date string
  }
  