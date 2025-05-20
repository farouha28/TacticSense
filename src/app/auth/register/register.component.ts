import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TextAnalysisService } from '../services/text-analysis.service';
import { UserRole } from '../models/user-profile';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  roleSpecificForm: FormGroup;
  
  userRoles = [
    { value: UserRole.PLAYER, label: 'Joueur' },
    { value: UserRole.COACH, label: 'Entraîneur' },
    { value: UserRole.AGENT, label: 'Agent' },
    { value: UserRole.RECRUITER, label: 'Recruteur' },
    { value: UserRole.SPONSOR, label: 'Sponsor' },
  ];
  
  bioText = '';
  isAnalyzing = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  certificateUploaded = false;
  certificateValid = false;
  
  autoFilledFields: Set<string> = new Set();
  
  get selectedRole(): UserRole | null {
    return this.registerForm?.get('role')?.value;
  }
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private textAnalysisService: TextAnalysisService,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.initForms();
  }
  
  initForms(): void {
    // Formulaire d'inscription de base
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
    
    // Formulaire spécifique au rôle (initialisé avec les champs communs)
    this.roleSpecificForm = this.fb.group({
      full_name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(16), Validators.max(100)]],
    });
    
    // Observer les changements de rôle pour mettre à jour le formulaire
    this.registerForm.get('role').valueChanges.subscribe(role => {
      this.updateRoleSpecificForm(role);
    });
  }
  
  updateRoleSpecificForm(role: UserRole): void {
    // Réinitialiser les champs spécifiques au rôle
    const commonControls = {
      full_name: this.roleSpecificForm.get('full_name').value,
      age: this.roleSpecificForm.get('age').value,
    };
    
    // Créer un nouveau FormGroup avec les contrôles communs
    this.roleSpecificForm = this.fb.group(commonControls);
    
    // Ajouter les contrôles spécifiques au rôle
    switch (role) {
      case UserRole.PLAYER:
        this.roleSpecificForm.addControl('position', this.fb.control(''));
        this.roleSpecificForm.addControl('league', this.fb.control(''));
        this.roleSpecificForm.addControl('current_club', this.fb.control(''));
        this.roleSpecificForm.addControl('appearances_overall', this.fb.control(''));
        this.roleSpecificForm.addControl('annual_salary_eur', this.fb.control(''));
        break;
        
      case UserRole.COACH:
        this.roleSpecificForm.addControl('experience_years', this.fb.control(''));
        this.roleSpecificForm.addControl('teams_coached', this.fb.control(''));
        this.roleSpecificForm.addControl('specialty', this.fb.control(''));
        break;
        
      case UserRole.AGENT:
        this.roleSpecificForm.addControl('agency_name', this.fb.control(''));
        this.roleSpecificForm.addControl('clients_number', this.fb.control(''));
        this.roleSpecificForm.addControl('certification_number', this.fb.control(''));
        break;
        
      case UserRole.RECRUITER:
        this.roleSpecificForm.addControl('organization', this.fb.control(''));
        this.roleSpecificForm.addControl('region', this.fb.control(''));
        this.roleSpecificForm.addControl('target_positions', this.fb.control(''));
        break;
        
      case UserRole.SPONSOR:
        this.roleSpecificForm.addControl('company', this.fb.control(''));
        this.roleSpecificForm.addControl('investment_range', this.fb.control(''));
        this.roleSpecificForm.addControl('interested_in', this.fb.control(''));
        break;
    }
    
    // Réinitialiser les champs auto-remplis
    this.autoFilledFields.clear();
  }
  
  passwordMatchValidator(form: FormGroup): { mismatch: boolean } | null {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;
    
    return password === confirmPassword ? null : { mismatch: true };
  }
  
  analyzeText(): void {
    if (!this.bioText.trim() || !this.selectedRole) {
      return;
    }
    
    this.isAnalyzing = true;
    this.errorMessage = '';
    
    this.textAnalysisService.analyzeText(this.bioText, this.selectedRole).subscribe(
      result => {
        this.isAnalyzing = false;
        
        // Mettre à jour les champs du formulaire avec les résultats de l'analyse
        Object.keys(result.extractedData).forEach(key => {
          if (this.roleSpecificForm.get(key)) {
            this.roleSpecificForm.get(key).setValue(result.extractedData[key]);
            this.autoFilledFields.add(key);
          }
        });
        
        this.successMessage = 'Analyse terminée ! Certains champs ont été remplis automatiquement.';
        setTimeout(() => this.successMessage = '', 5000);
      },
      error => {
        this.isAnalyzing = false;
        this.errorMessage = 'Erreur lors de l\'analyse du texte. Veuillez réessayer.';
        console.error('Text analysis error:', error);
      }
    );
  }
  
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    this.certificateUploaded = !!file;
    this.certificateValid = file && file.type === 'application/pdf';
  }
  
  isFieldAutoFilled(fieldName: string): boolean {
    return this.autoFilledFields.has(fieldName);
  }
  
  onSubmit(): void {
    if (this.registerForm.invalid || this.roleSpecificForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    // Combiner les données des deux formulaires
    const userData = {
      ...this.registerForm.value,
      ...this.roleSpecificForm.value,
    };
    
    // Supprimer le champ confirmPassword
    delete userData.confirmPassword;
    
    this.authService.register(userData).subscribe(
      response => {
        this.isLoading = false;
        this.successMessage = 'Inscription réussie ! Redirection vers votre tableau de bord...';
        
        // Rediriger vers le tableau de bord après un court délai
        setTimeout(() => {
          this.router.navigate(['/pages/dashboard']);
        }, 1500);
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
        console.error('Registration error:', error);
      }
    );
  }
  
  resetFilters(): void {
    this.roleSpecificForm.reset({
      full_name: '',
      age: '',
    });
    this.updateRoleSpecificForm(this.selectedRole);
    this.bioText = '';
    this.autoFilledFields.clear();
  }
}



