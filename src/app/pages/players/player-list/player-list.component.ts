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

  constructor(private playerService: PlayersService, private router: Router) {}

  ngOnInit(): void {
    this.players = this.playerService.getAllPlayers();
  }

  goToProfile(id: number): void {
    this.router.navigate(['/players', id]);
  }
}
