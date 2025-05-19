// src/app/pages/players/player-profile/player-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayersService, Player } from '../../../services/players.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {
  player?: Player;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayersService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.player = this.playerService.getPlayerById(id);
  }
}
