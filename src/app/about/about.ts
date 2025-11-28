import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [ CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About{
  skills: string[] = [
    'Data Analysis', 'Python', 'SQL',
    'Microsoft Excel', 'PowerPoint',
    'Financial Modelling', 'Machine Learning'
  ];
}