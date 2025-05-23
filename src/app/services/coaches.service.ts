import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Coach } from '../models/coach.model';

@Injectable({
  providedIn: 'root'
})
export class CoachesService {
  private coaches: Coach[] = [];

  constructor(private http: HttpClient) {}

  getCoaches(): Observable<Coach[]> {
    if (this.coaches.length > 0) {
      return of(this.coaches);
    }

    return this.http.get<Coach[]>('assets/fake-data/coaches.json');
  }

  getAllCoaches(): Observable<Coach[]> {
    return this.getCoaches();
  }

  getCoachById(id: number): Observable<Coach | undefined> {
    return new Observable(observer => {
      this.getCoaches().subscribe(coaches => {
        const coach = coaches.find(c => c.id === id);
        observer.next(coach);
        observer.complete();
      });
    });
  }

  searchCoaches(query: string): Observable<Coach[]> {
    return new Observable(observer => {
      this.getCoaches().subscribe(coaches => {
        const filteredCoaches = coaches.filter(coach =>
          coach.name.toLowerCase().includes(query.toLowerCase()) ||
          coach.nationality.toLowerCase().includes(query.toLowerCase()) ||
          coach.currentClub.toLowerCase().includes(query.toLowerCase()) ||
          coach.tacticalStyle.toLowerCase().includes(query.toLowerCase())
        );
        observer.next(filteredCoaches);
        observer.complete();
      });
    });
  }
}
