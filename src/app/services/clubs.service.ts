import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Club } from '../models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  private clubs: Club[] = [];

  constructor(private http: HttpClient) {}

  getClubs(): Observable<Club[]> {
    if (this.clubs.length > 0) {
      return of(this.clubs);
    }

    return this.http.get<Club[]>('assets/fake-data/clubs.json');
  }

  getAllClubs(): Observable<Club[]> {
    return this.getClubs();
  }

  getClubById(id: number): Observable<Club | undefined> {
    return new Observable(observer => {
      this.getClubs().subscribe(clubs => {
        const club = clubs.find(c => c.id === id);
        observer.next(club);
        observer.complete();
      });
    });
  }

  getClubsByCountry(country: string): Observable<Club[]> {
    return new Observable(observer => {
      this.getClubs().subscribe(clubs => {
        const filteredClubs = clubs.filter(club =>
          club.country.toLowerCase() === country.toLowerCase()
        );
        observer.next(filteredClubs);
        observer.complete();
      });
    });
  }

  searchClubs(query: string): Observable<Club[]> {
    return new Observable(observer => {
      this.getClubs().subscribe(clubs => {
        const filteredClubs = clubs.filter(club =>
          club.name.toLowerCase().includes(query.toLowerCase()) ||
          club.city.toLowerCase().includes(query.toLowerCase()) ||
          club.country.toLowerCase().includes(query.toLowerCase()) ||
          club.league.toLowerCase().includes(query.toLowerCase())
        );
        observer.next(filteredClubs);
        observer.complete();
      });
    });
  }
}