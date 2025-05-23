// src/app/pages/players/player-list/player-list.component.ts
import { Component, OnInit } from '@angular/core';
import { PlayersService, Player } from '../../../services/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];
  loading = true;

  constructor(private playerService: PlayersService, private router: Router) {}

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe({
      next: (players) => {
        this.players = players;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des joueurs:', error);
        this.loading = false;
      }
    });
  }

  goToProfile(id: number): void {
    this.router.navigate(['/players', id]);
  }

  formatMarketValue(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(0) + 'M€';
    }
    return value.toLocaleString() + '€';
  }
}
