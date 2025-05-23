import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  club: string;
  nationality: string;
  photo: string;
  marketValue: number;
  goals: number;
  assists: number;
  matches: number;
  attributes?: {[key: string]: number};
  compatibility?: number;
  useDefaultImage?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private players: Player[] = [];
  private playersLoaded = false;

  constructor(private http: HttpClient) { }

  getAllPlayers(): Observable<Player[]> {
    if (this.playersLoaded) {
      return of(this.players);
    }
    
    return this.http.get<Player[]>('assets/fake-data/players.json').pipe(
      map(players => {
        this.players = players;
        this.playersLoaded = true;
        return players;
      }),
      catchError(error => {
        console.error('Erreur lors du chargement des joueurs', error);
        return of([]);
      })
    );
  }

  getPlayerById(id: number): Observable<Player | undefined> {
    if (this.playersLoaded) {
      return of(this.players.find(player => player.id === id));
    }
    
    return this.getAllPlayers().pipe(
      map(players => players.find(player => player.id === id))
    );
  }
}



