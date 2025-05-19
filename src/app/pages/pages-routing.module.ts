import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'players',
        loadChildren: () =>
          import('./players/players.module').then(m => m.PlayersModule),
      },
      {
        path: 'clubs',
        loadChildren: () =>
          import('./clubs/clubs.module').then(m => m.ClubsModule),
      },
      {
        path: 'coaches',
        loadChildren: () =>
          import('./coaches/coaches.module').then(m => m.CoachesModule),
      },
      {
        path: 'agents',
        loadChildren: () =>
          import('./agents/agents.module').then(m => m.AgentsModule),
      },
      {
        path: 'scouts',
        loadChildren: () =>
          import('./scouts/scouts.module').then(m => m.ScoutsModule),
      },
      {
        path: 'sponsors',
        loadChildren: () =>
          import('./sponsors/sponsors.module').then(m => m.SponsorsModule),
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('./stats/stats.module').then(m => m.StatsModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then(m => m.SettingsModule),
      },
      {
        path: 'extra-components/chat',
        loadChildren: () =>
          import('./extra-components/extra-components.module').then(m => m.ExtraComponentsModule),
      },
      {
        path: 'maps',
        loadChildren: () =>
          import('./maps/maps.module').then(m => m.MapsModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
