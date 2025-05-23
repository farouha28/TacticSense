import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Club {
  id: number;
  name: string;
  logo: string;
  country: string;
  city: string;
  founded: number;
  league: string;
  stadium: string;
  stadiumCapacity: number;
  marketValue: number;
  trophies: {
    league: number;
    national: number;
    international: number;
  };
  stats: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  private clubs: Club[] = [
    {
      id: 1,
      name: 'Paris Saint-Germain',
      logo: 'assets/images/clubs/psg.png',
      country: 'France',
      city: 'Paris',
      founded: 1970,
      league: 'Ligue 1',
      stadium: 'Parc des Princes',
      stadiumCapacity: 47929,
      marketValue: 1020,
      trophies: {
        league: 11,
        national: 14,
        international: 0
      },
      stats: {
        wins: 18,
        draws: 4,
        losses: 2,
        goalsFor: 62,
        goalsAgainst: 18
      }
    },
    {
      id: 2,
      name: 'Real Madrid',
      logo: 'assets/images/clubs/real_madrid.png',
      country: 'Espagne',
      city: 'Madrid',
      founded: 1902,
      league: 'La Liga',
      stadium: 'Santiago Bernabéu',
      stadiumCapacity: 81044,
      marketValue: 1310,
      trophies: {
        league: 35,
        national: 20,
        international: 14
      },
      stats: {
        wins: 20,
        draws: 3,
        losses: 1,
        goalsFor: 58,
        goalsAgainst: 15
      }
    },
    {
      id: 3,
      name: 'Manchester City',
      logo: 'assets/images/clubs/manchester_city.png',
      country: 'Angleterre',
      city: 'Manchester',
      founded: 1880,
      league: 'Premier League',
      stadium: 'Etihad Stadium',
      stadiumCapacity: 55097,
      marketValue: 1280,
      trophies: {
        league: 9,
        national: 12,
        international: 1
      },
      stats: {
        wins: 19,
        draws: 5,
        losses: 0,
        goalsFor: 65,
        goalsAgainst: 20
      }
    },
    {
      id: 4,
      name: 'Bayern Munich',
      logo: 'assets/images/clubs/bayern_munich.png',
      country: 'Allemagne',
      city: 'Munich',
      founded: 1900,
      league: 'Bundesliga',
      stadium: 'Allianz Arena',
      stadiumCapacity: 75024,
      marketValue: 1050,
      trophies: {
        league: 32,
        national: 20,
        international: 6
      },
      stats: {
        wins: 17,
        draws: 2,
        losses: 5,
        goalsFor: 60,
        goalsAgainst: 25
      }
    },
    {
      id: 5,
      name: 'FC Barcelone',
      logo: 'assets/images/clubs/barcelona.png',
      country: 'Espagne',
      city: 'Barcelone',
      founded: 1899,
      league: 'La Liga',
      stadium: 'Camp Nou',
      stadiumCapacity: 99354,
      marketValue: 1100,
      trophies: {
        league: 26,
        national: 31,
        international: 5
      },
      stats: {
        wins: 16,
        draws: 4,
        losses: 4,
        goalsFor: 55,
        goalsAgainst: 22
      }
    },
    {
      id: 6,
      name: 'Liverpool FC',
      logo: 'assets/images/clubs/liverpool.png',
      country: 'Angleterre',
      city: 'Liverpool',
      founded: 1892,
      league: 'Premier League',
      stadium: 'Anfield',
      stadiumCapacity: 53394,
      marketValue: 1050,
      trophies: {
        league: 19,
        national: 17,
        international: 6
      },
      stats: {
        wins: 17,
        draws: 3,
        losses: 4,
        goalsFor: 57,
        goalsAgainst: 19
      }
    }
  ];

  getClubs(): Observable<Club[]> {
    return of(this.clubs).pipe(delay(1000));
  }

  getClubById(id: number): Observable<Club | undefined> {
    const club = this.clubs.find(c => c.id === id);
    return of(club).pipe(delay(500));
  }

  searchClubs(query: string, country?: string): Observable<Club[]> {
    let filtered = [...this.clubs];
    
    if (query) {
      const searchQuery = query.toLowerCase();
      filtered = filtered.filter(club => 
        club.name.toLowerCase().includes(searchQuery) || 
        club.city.toLowerCase().includes(searchQuery) ||
        club.league.toLowerCase().includes(searchQuery)
      );
    }
    
    if (country && country !== 'all') {
      filtered = filtered.filter(club => club.country === country);
    }
    
    return of(filtered).pipe(delay(500));
  }
}


