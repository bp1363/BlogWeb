import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {
  contactForm: FormGroup;
  successMessage: string = "";

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      message: ['']
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.successMessage = "✅ Thank you for contacting us! We'll get back to you soon.";
      this.contactForm.reset();
      setTimeout(() => this.successMessage = "", 5000);
    }
  }
}
