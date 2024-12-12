import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  contactForm!: FormGroup; // Use definite assignment assertion

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form in ngOnInit
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
