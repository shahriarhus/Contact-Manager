import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  contactId: string = '';
  contactForm!: FormGroup; // Declare the FormGroup without initializing it here

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });

    // Get the contact ID from the URL
    this.contactId = this.route.snapshot.paramMap.get('id')!;
    this.loadContact();
  }

  // Fetch the existing contact details and populate the form
  loadContact(): void {
    this.contactService.getContact(this.contactId).subscribe((data) => {
      this.contactForm.patchValue({
        name: data.name,
        email: data.email,
        number: data.number,
      });
    });
  }

  // Save the updated contact
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.contactService.updateContact(this.contactId, this.contactForm.value).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
