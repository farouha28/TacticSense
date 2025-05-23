import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'players',
      loadChildren: () => import('./players/players.module')
        .then(m => m.PlayersModule),
    },
    {
      path: 'clubs',
      loadChildren: () => import('./clubs/clubs.module')
        .then(m => m.ClubsModule),
    },
    {
      path: 'coaches',
      loadChildren: () => import('./coaches/coaches.module')
        .then(m => m.CoachesModule),
    },
    {
      path: 'agents',
      loadChildren: () => import('./agents/agents.module')
        .then(m => m.AgentsModule),
    },
    {
      path: 'sponsors',
      loadChildren: () => import('./sponsors/sponsors.module')
        .then(m => m.SponsorsModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
