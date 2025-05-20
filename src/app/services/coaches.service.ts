import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Coach {
  id: number;
  name: string;
  age: number;
  nationality: string;
  club: string;
  experience: number; // années
  trophies: number;
  winRate: number; // pourcentage
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoachesService {
  private coaches: Coach[] = [
    {
      id: 1,
      name: 'Pep Guardiola',
      age: 52,
      nationality: 'Espagne',
      club: 'Manchester City',
      experience: 15,
      trophies: 35,
      winRate: 73.8,
      image: 'https://example.com/guardiola.jpg'
    },
    {
      id: 2,
      name: 'Carlo Ancelotti',
      age: 64,
      nationality: 'Italie',
      club: 'Real Madrid',
      experience: 28,
      trophies: 26,
      winRate: 61.2,
      image: 'https://example.com/ancelotti.jpg'
    },
    {
      id: 3,
      name: 'Jürgen Klopp',
      age: 56,
      nationality: 'Allemagne',
      club: 'Liverpool',
      experience: 22,
      trophies: 12,
      winRate: 58.7,
      image: 'https://example.com/klopp.jpg'
    }
  ];

  getAllCoaches(): Observable<Coach[]> {
    return of(this.coaches);
  }

  getCoachById(id: number): Observable<Coach | undefined> {
    return of(this.coaches.find(c => c.id === id));
  }
}
