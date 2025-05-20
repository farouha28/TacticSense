import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Sponsor {
  id: number;
  name: string;
  industry: string;
  annualBudget: number; // en millions €
  mainPartnership: string;
  since: number; // année
  logo: string;
}

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {
  private sponsors: Sponsor[] = [
    {
      id: 1,
      name: 'Emirates',
      industry: 'Aviation',
      annualBudget: 120,
      mainPartnership: 'Real Madrid',
      since: 2013,
      logo: 'https://example.com/emirates.png'
    },
    {
      id: 2,
      name: 'Nike',
      industry: 'Équipement sportif',
      annualBudget: 150,
      mainPartnership: 'FC Barcelone',
      since: 1998,
      logo: 'https://example.com/nike.png'
    },
    {
      id: 3,
      name: 'Adidas',
      industry: 'Équipement sportif',
      annualBudget: 140,
      mainPartnership: 'Manchester United',
      since: 2015,
      logo: 'https://example.com/adidas.png'
    }
  ];

  getAllSponsors(): Observable<Sponsor[]> {
    return of(this.sponsors);
  }

  getSponsorById(id: number): Observable<Sponsor | undefined> {
    return of(this.sponsors.find(s => s.id === id));
  }
}

