import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly API_URL = 'https://api.tacticsense.com/players';
  
  // Mock data for development
  private mockPlayers = [
    {
      id: 1,
      name: 'Lionel Messi',
      age: 34,
      position: 'FWD',
      club: 'Paris Saint-Germain',
      nationality: 'Argentina',
      photo: 'assets/images/players/messi.jpg',
      goals: 30,
      assists: 14,
      marketValue: 80,
      trophies: 35
    },
    {
      id: 2,
      name: 'Cristiano Ronaldo',
      age: 36,
      position: 'FWD',
      club: 'Manchester United',
      nationality: 'Portugal',
      photo: 'assets/images/players/ronaldo.jpg',
      goals: 29,
      assists: 5,
      marketValue: 45,
      trophies: 32
    },
    {
      id: 3,
      name: 'Kylian Mbappé',
      age: 22,
      position: 'FWD',
      club: 'Paris Saint-Germain',
      nationality: 'France',
      photo: 'assets/images/players/mbappe.jpg',
      goals: 27,
      assists: 10,
      marketValue: 160,
      trophies: 11
    },
    {
      id: 4,
      name: 'Kevin De Bruyne',
      age: 30,
      position: 'MID',
      club: 'Manchester City',
      nationality: 'Belgium',
      photo: 'assets/images/players/debruyne.jpg',
      goals: 10,
      assists: 20,
      marketValue: 100,
      trophies: 13
    },
    {
      id: 5,
      name: 'Virgil van Dijk',
      age: 30,
      position: 'DEF',
      club: 'Liverpool',
      nationality: 'Netherlands',
      photo: 'assets/images/players/vandijk.jpg',
      goals: 3,
      assists: 1,
      marketValue: 55,
      trophies: 8
    },
    {
      id: 6,
      name: 'Manuel Neuer',
      age: 35,
      position: 'GK',
      club: 'Bayern Munich',
      nationality: 'Germany',
      photo: 'assets/images/players/neuer.jpg',
      goals: 0,
      assists: 0,
      marketValue: 15,
      trophies: 27
    }
  ];

  constructor(private http: HttpClient) {}
  
  getTopPlayers(): Observable<any[]> {
    // In production, use the real API
    // return this.http.get<any[]>(`${this.API_URL}/top`);
    
    // For development, return mock data
    return of(this.mockPlayers).pipe(delay(800));
  }
  
  getAiRecommendation(): Observable<any> {
    // In production, use the real API
    // return this.http.get<any>(`${this.API_URL}/recommendation`);
    
    // For development, return mock data
    const recommendation = {
      id: 7,
      name: 'Erling Haaland',
      age: 21,
      position: 'FWD',
      club: 'Borussia Dortmund',
      nationality: 'Norway',
      photo: 'assets/images/players/haaland.jpg',
      goals: 27,
      assists: 8,
      marketValue: 150,
      trophies: 3
    };
    
    return of(recommendation).pipe(delay(2000));
  }
  
  getPlayerAttributes(playerId: number): Observable<any[]> {
    // Mock player attributes
    const attributes = [
      { key: 'Pace', value: 85 },
      { key: 'Shooting', value: 92 },
      { key: 'Passing', value: 88 },
      { key: 'Dribbling', value: 95 },
      { key: 'Defending', value: 35 },
      { key: 'Physical', value: 65 },
      { key: 'Vision', value: 90 }
    ];
    
    return of(attributes).pipe(delay(500));
  }
}
