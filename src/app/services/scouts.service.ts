import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Scout {
  id: number;
  name: string;
  nationality: string;
  club: string;
  region: string;
  discoveries: number;
  yearsExperience: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScoutsService {
  private scouts: Scout[] = [
    {
      id: 1,
      name: 'Luis Campos',
      nationality: 'Portugal',
      club: 'Paris Saint-Germain',
      region: 'Amérique du Sud',
      discoveries: 28,
      yearsExperience: 15,
      image: 'https://example.com/campos.jpg'
    },
    {
      id: 2,
      name: 'Monchi',
      nationality: 'Espagne',
      club: 'Séville FC',
      region: 'Afrique',
      discoveries: 35,
      yearsExperience: 20,
      image: 'https://example.com/monchi.jpg'
    },
    {
      id: 3,
      name: 'Sven Mislintat',
      nationality: 'Allemagne',
      club: 'Ajax Amsterdam',
      region: 'Europe de l\'Est',
      discoveries: 22,
      yearsExperience: 12,
      image: 'https://example.com/mislintat.jpg'
    }
  ];

  getAllScouts(): Observable<Scout[]> {
    return of(this.scouts);
  }

  getScoutById(id: number): Observable<Scout | undefined> {
    return of(this.scouts.find(s => s.id === id));
  }
}

