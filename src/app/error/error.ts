import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [CommonModule],
  templateUrl: './error.html',
  styleUrl: './error.scss'
})
export class Error {
    @Input() message: string = '';
  @Output() messageChange = new EventEmitter<string>();

  close() {
    this.message = '';
    this.messageChange.emit('');

}
}