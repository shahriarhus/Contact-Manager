import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

interface Contact {
  _id: string;
  name: string;
  email: string;
  number: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  contacts: Contact[] = []; // Explicitly define the type as an array of Contact

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // Fetch contacts from the server
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }

  deleteContact(id: string): void {
    // Delete the contact from the server
    this.contactService.deleteContact(id).subscribe(() => {
      // Filter the contact out of the array
      this.contacts = this.contacts.filter((contact) => contact._id !== id);
    });
  }
}
