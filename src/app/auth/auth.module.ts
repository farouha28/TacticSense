import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbSelectModule,
  NbStepperModule,
  NbIconModule,
  NbBadgeModule,
} from '@nebular/theme';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { TextAnalysisService } from './services/text-analysis.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbSelectModule,
    NbStepperModule,
    NbIconModule,
    NbBadgeModule,
    AuthRoutingModule,
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
  providers: [
    AuthService,
    TextAnalysisService,
    AuthGuard,
  ],
})
export class AuthModule { }

