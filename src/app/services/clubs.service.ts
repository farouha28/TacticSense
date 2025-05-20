import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Club {
  id: number;
  name: string;
  country: string;
  league: string;
  founded: number;
  stadiumCapacity: number;
  trophies: number;
  value: number; // en millions €
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClubsService {
  private clubs: Club[] = [
    {
      id: 1,
      name: 'Real Madrid',
      country: 'Espagne',
      league: 'La Liga',
      founded: 1902,
      stadiumCapacity: 81044,
      trophies: 95,
      value: 4600,
      image: 'https://example.com/real.jpg'
    },
    {
      id: 2,
      name: 'Bayern Munich',
      country: 'Allemagne',
      league: 'Bundesliga',
      founded: 1900,
      stadiumCapacity: 75000,
      trophies: 82,
      value: 3800,
      image: 'https://example.com/bayern.jpg'
    },
    {
      id: 3,
      name: 'Paris Saint-Germain',
      country: 'France',
      league: 'Ligue 1',
      founded: 1970,
      stadiumCapacity: 47929,
      trophies: 45,
      value: 3200,
      image: 'https://example.com/psg.jpg'
    }
  ];

  getAllClubs(): Observable<Club[]> {
    return of(this.clubs);
  }

  getClubById(id: number): Observable<Club | undefined> {
    return of(this.clubs.find(c => c.id === id));
  }
}