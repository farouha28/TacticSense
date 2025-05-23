import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersListComponent } from './players-list/players-list.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import { PlayerRecommendationComponent } from './player-recommendation/player-recommendation.component';
import { AiRecommendationSelectionComponent } from './ai-recommendation-selection/ai-recommendation-selection.component';
import { PlayersComponent } from './players.component';

const routes: Routes = [
  {
    path: '',
    component: PlayersComponent,
    children: [
      {
        path: '',
        component: PlayersListComponent,
      },
      {
        path: 'list',
        component: PlayersListComponent,
      },
      {
        path: 'ai-selection',
        component: AiRecommendationSelectionComponent,
      },
      {
        path: 'recommendation',
        component: PlayerRecommendationComponent,
      },
      {
        path: ':id',
        component: PlayerProfileComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersRoutingModule { }



