import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbCardModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { StatisticsComponent } from './statistics.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    NgxEchartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: StatisticsComponent,
      },
    ]),
  ],
  declarations: [
    StatisticsComponent,
  ],
})
export class StatisticsModule { }