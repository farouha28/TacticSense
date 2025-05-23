import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });

    // Récupérer l'URL de retour des paramètres de requête ou utiliser la valeur par défaut
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pages/dashboard';

    // Rediriger si déjà connecté
    if (this.authService.isLoggedIn) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };

    this.authService.login(credentials).subscribe(
      response => {
        this.isLoading = false;

        // Rediriger vers la page demandée ou le tableau de bord
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Identifiants incorrects. Veuillez réessayer.';
        console.error('Login error:', error);
      }
    );
  }

  // Méthode pour accéder directement à la plateforme (demo)
  swipeToPlatform(): void {
    this.router.navigate(['/pages/dashboard']);
  }
}