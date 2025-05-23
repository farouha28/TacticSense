import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Player {
  id: number;
  name: string;
  photo: string;
  position: string;
  nationality: string;
  age: number;
  club: string;
  marketValue: number;
  stats: {
    goals: number;
    assists: number;
    matches: number;
    rating: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private players: Player[] = [
    {
      id: 1,
      name: 'Kylian Mbappé',
      photo: 'assets/images/players/mbappe.jpg',
      position: 'attaquant',
      nationality: 'France',
      age: 24,
      club: 'Real Madrid',
      marketValue: 180,
      stats: {
        goals: 41,
        assists: 10,
        matches: 43,
        rating: 8.7,
      },
    },
    {
      id: 2,
      name: 'Erling Haaland',
      photo: 'assets/images/players/haaland.jpg',
      position: 'attaquant',
      nationality: 'Norvège',
      age: 23,
      club: 'Manchester City',
      marketValue: 170,
      stats: {
        goals: 52,
        assists: 9,
        matches: 53,
        rating: 8.5,
      },
    },
    {
      id: 3,
      name: 'Jude Bellingham',
      photo: 'assets/images/players/bellingham.jpg',
      position: 'milieu',
      nationality: 'Angleterre',
      age: 20,
      club: 'Real Madrid',
      marketValue: 150,
      stats: {
        goals: 14,
        assists: 7,
        matches: 42,
        rating: 8.3,
      },
    },
    {
      id: 4,
      name: 'Virgil van Dijk',
      photo: 'assets/images/players/vandijk.jpg',
      position: 'défenseur',
      nationality: 'Pays-Bas',
      age: 32,
      club: 'Liverpool',
      marketValue: 45,
      stats: {
        goals: 3,
        assists: 2,
        matches: 38,
        rating: 7.8,
      },
    },
    {
      id: 5,
      name: 'Thibaut Courtois',
      photo: 'assets/images/players/courtois.jpg',
      position: 'gardien',
      nationality: 'Belgique',
      age: 31,
      club: 'Real Madrid',
      marketValue: 40,
      stats: {
        goals: 0,
        assists: 0,
        matches: 36,
        rating: 7.9,
      },
    },
    {
      id: 6,
      name: 'Kevin De Bruyne',
      photo: 'assets/images/players/debruyne.jpg',
      position: 'milieu',
      nationality: 'Belgique',
      age: 32,
      club: 'Manchester City',
      marketValue: 70,
      stats: {
        goals: 7,
        assists: 28,
        matches: 45,
        rating: 8.4,
      },
    }
  ];

  getPlayers(): Observable<Player[]> {
    // Simuler un appel API avec un délai
    return of(this.players).pipe(delay(1000));
  }

  getPlayerById(id: number): Observable<Player | undefined> {
    const player = this.players.find(p => p.id === id);
    return of(player).pipe(delay(500));
  }

  searchPlayers(query: string, position?: string): Observable<Player[]> {
    let filtered = [...this.players];
    
    if (query) {
      const searchQuery = query.toLowerCase();
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(searchQuery) || 
        player.club.toLowerCase().includes(searchQuery) ||
        player.nationality.toLowerCase().includes(searchQuery)
      );
    }
    
    if (position && position !== 'all') {
      filtered = filtered.filter(player => player.position === position);
    }
    
    return of(filtered).pipe(delay(500));
  }
}
