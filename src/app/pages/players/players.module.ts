import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbButtonModule,
  NbSelectModule,
  NbListModule,
  NbUserModule,
  NbBadgeModule,
  NbProgressBarModule,
  NbSpinnerModule,
  NbFormFieldModule,
  NbTagModule,
  NbTooltipModule,
  NbTabsetModule,
  NbDialogModule,
} from '@nebular/theme';

import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { PlayerRecommendationComponent } from './player-recommendation/player-recommendation.component';
import { AiRecommendationSelectionComponent } from './ai-recommendation-selection/ai-recommendation-selection.component';
import { PlayerCardComponent } from './player-card/player-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbListModule,
    NbUserModule,
    NbBadgeModule,
    NbProgressBarModule,
    NbSpinnerModule,
    NbFormFieldModule,
    NbTagModule,
    NbTooltipModule,
    NbTabsetModule,
    NbDialogModule,
    PlayersRoutingModule,
  ],
  declarations: [
    PlayersComponent,
    PlayersListComponent,
    PlayerProfileComponent,
    PlayerRecommendationComponent,
    AiRecommendationSelectionComponent,
    PlayerCardComponent,
  ],
})
export class PlayersModule { }


