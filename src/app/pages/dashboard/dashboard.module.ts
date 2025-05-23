import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbButtonModule, NbProgressBarModule, NbSpinnerModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbProgressBarModule,
    NbSpinnerModule,
    HttpClientModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
