import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/contacts';  // Backend API URL

  constructor(private http: HttpClient) { }

  // Get all contacts
  getContacts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Get a single contact by ID
  getContact(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Add a new contact
  addContact(contact: any): Observable<any> {
    return this.http.post(this.apiUrl, contact);
  }

  // Update an existing contact
  updateContact(id: string, contact: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contact);
  }

  // Delete a contact
  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
