import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';


@NgModule({
  declarations: [
    PlayerListComponent,
    PlayerProfileComponent
  ],
  imports: [
    CommonModule,
    PlayersRoutingModule
  ]
})
export class PlayersModule { }
