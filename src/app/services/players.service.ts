// src/app/services/players.service.ts
import { Injectable } from '@angular/core';

export interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  nationality: string;
  club: string;
  goals: number;
  assists: number;
  matches: number;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private players: Player[] = [
    {
      id: 1,
      name: 'Kylian Mbappé',
      position: 'Attaquant',
      age: 24,
      nationality: 'France',
      club: 'Paris Saint-Germain',
      goals: 42,
      assists: 12,
      matches: 48,
      image: 'https://example.com/mbappe.jpg'
    },
    {
      id: 2,
      name: 'Achraf Hakimi',
      position: 'Défenseur',
      age: 25,
      nationality: 'Maroc',
      club: 'Paris Saint-Germain',
      goals: 8,
      assists: 10,
      matches: 45,
      image: 'https://example.com/hakimi.jpg'
    }
  ];

  getAllPlayers() {
    return this.players;
  }

  getPlayerById(id: number): Player | undefined {
    return this.players.find(p => p.id === id);
  }
}
