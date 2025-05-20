import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';
import { UserProfile, RegisterRequest, LoginRequest, AuthResponse, UserRole } from '../models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://api.sportlink.com/auth';
  private currentUserSubject: BehaviorSubject<UserProfile | null> = new BehaviorSubject<UserProfile | null>(null);
  
  public currentUser$: Observable<UserProfile | null> = this.currentUserSubject.asObservable();
  
  constructor(private http: HttpClient) {
    // Charger l'utilisateur depuis le localStorage au démarrage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }
  
  get currentUser(): UserProfile | null {
    return this.currentUserSubject.value;
  }
  
  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
  
  get token(): string | null {
    return localStorage.getItem('token');
  }
  
  register(userData: RegisterRequest): Observable<AuthResponse> {
    // En production, décommenter la ligne ci-dessous pour utiliser l'API réelle
    // return this.http.post<AuthResponse>(`${this.API_URL}/register`, userData)
    //   .pipe(tap(this.setSession.bind(this)));
    
    // Pour le développement, simuler une inscription réussie
    return this.mockRegister(userData).pipe(
      delay(1500), // Simuler un délai réseau
      tap(this.setSession.bind(this)),
    );
  }
  
  login(credentials: LoginRequest): Observable<AuthResponse> {
    // En production, décommenter la ligne ci-dessous pour utiliser l'API réelle
    // return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
    //   .pipe(tap(this.setSession.bind(this)));
    
    // Pour le développement, simuler une connexion réussie
    return this.mockLogin(credentials).pipe(
      delay(1000), // Simuler un délai réseau
      tap(this.setSession.bind(this)),
    );
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  private setSession(authResult: AuthResponse): void {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', authResult.expires_at);
    localStorage.setItem('currentUser', JSON.stringify(authResult.user));
    this.currentUserSubject.next(authResult.user);
  }
  
  private mockRegister(userData: RegisterRequest): Observable<AuthResponse> {
    // Créer un utilisateur fictif avec un ID généré
    const user: UserProfile = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      email: userData.email,
      role: userData.role,
      full_name: userData.full_name,
      age: userData.age,
      created_at: new Date(),
      updated_at: new Date(),
      ...userData, // Ajouter tous les autres champs spécifiques au rôle
    };
    
    // Créer une réponse d'authentification fictive
    const authResponse: AuthResponse = {
      user: user,
      token: 'mock_token_' + Math.random().toString(36).substr(2, 16),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Expire dans 24h
    };
    
    return of(authResponse);
  }
  
  private mockLogin(credentials: LoginRequest): Observable<AuthResponse> {
    // Vérifier si l'email est au format valide
    if (!credentials.email.includes('@')) {
      throw new Error('Email invalide');
    }
    
    // Créer un utilisateur fictif basé sur l'email
    const role = this.determineRoleFromEmail(credentials.email);
    
    const user: UserProfile = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      email: credentials.email,
      role: role,
      full_name: this.generateNameFromEmail(credentials.email),
      age: Math.floor(Math.random() * 30) + 20, // Âge entre 20 et 50
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000), // Date de création aléatoire dans la dernière année
      updated_at: new Date(),
    };
    
    // Ajouter des champs spécifiques au rôle
    this.addRoleSpecificFields(user);
    
    // Créer une réponse d'authentification fictive
    const authResponse: AuthResponse = {
      user: user,
      token: 'mock_token_' + Math.random().toString(36).substr(2, 16),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Expire dans 24h
    };
    
    return of(authResponse);
  }
  
  private determineRoleFromEmail(email: string): UserRole {
    const domain = email.split('@')[1];
    
    if (domain.includes('player') || domain.includes('joueur')) {
      return UserRole.PLAYER;
    } else if (domain.includes('coach') || domain.includes('entraineur')) {
      return UserRole.COACH;
    } else if (domain.includes('agent')) {
      return UserRole.AGENT;
    } else if (domain.includes('recruiter') || domain.includes('recruteur')) {
      return UserRole.RECRUITER;
    } else if (domain.includes('sponsor')) {
      return UserRole.SPONSOR;
    }
    
    // Par défaut, retourner un rôle aléatoire
    const roles = Object.values(UserRole);
    return roles[Math.floor(Math.random() * roles.length)];
  }
  
  private generateNameFromEmail(email: string): string {
    const localPart = email.split('@')[0];
    // Convertir en format nom propre (première lettre en majuscule)
    const parts = localPart.split(/[._-]/);
    const formattedParts = parts.map(part => 
      part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    );
    
    return formattedParts.join(' ');
  }
  
  private addRoleSpecificFields(user: UserProfile): void {
    switch (user.role) {
      case UserRole.PLAYER:
        user.position = this.getRandomPosition();
        user.league = this.getRandomLeague();
        user.current_club = this.getRandomClub();
        user.appearances_overall = Math.floor(Math.random() * 300);
        user.annual_salary_eur = Math.floor(Math.random() * 9000000) + 1000000;
        break;
        
      case UserRole.COACH:
        user.experience_years = Math.floor(Math.random() * 20) + 1;
        user.teams_coached = this.getRandomClubs(Math.floor(Math.random() * 3) + 1).join(', ');
        user.specialty = this.getRandomCoachSpecialty();
        break;
        
      case UserRole.AGENT:
        user.agency_name = this.getRandomAgencyName();
        user.clients_number = Math.floor(Math.random() * 30) + 1;
        user.certification_number = 'FIFA-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        break;
        
      case UserRole.RECRUITER:
        user.organization = this.getRandomClub();
        user.region = this.getRandomRegion();
        user.target_positions = this.getRandomPositions(Math.floor(Math.random() * 3) + 1).join(', ');
        break;
        
      case UserRole.SPONSOR:
        user.company = this.getRandomCompany();
        user.investment_range = this.getRandomInvestmentRange();
        user.interested_in = this.getRandomSponsorInterests();
        break;
    }
  }
  
  // Méthodes utilitaires pour générer des données aléatoires
  private getRandomPosition(): string {
    const positions = ['Attaquant', 'Milieu offensif', 'Milieu défensif', 'Défenseur central', 'Arrière latéral', 'Gardien de but'];
    return positions[Math.floor(Math.random() * positions.length)];
  }
  
  private getRandomPositions(count: number): string[] {
    const positions = ['Attaquant', 'Milieu offensif', 'Milieu défensif', 'Défenseur central', 'Arrière latéral', 'Gardien de but'];
    const result = [];
    
    for (let i = 0; i < count; i++) {
      const position = positions[Math.floor(Math.random() * positions.length)];
      if (!result.includes(position)) {
        result.push(position);
      }
    }
    
    return result;
  }
  
  private getRandomLeague(): string {
    const leagues = ['Ligue 1', 'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Eredivisie', 'Primeira Liga'];
    return leagues[Math.floor(Math.random() * leagues.length)];
  }
  
  private getRandomClub(): string {
    const clubs = ['Paris Saint-Germain', 'Olympique de Marseille', 'AS Monaco', 'Manchester United', 'Liverpool FC', 
                  'FC Barcelone', 'Real Madrid', 'Juventus Turin', 'Bayern Munich', 'Ajax Amsterdam'];
    return clubs[Math.floor(Math.random() * clubs.length)];
  }
  
  private getRandomClubs(count: number): string[] {
    const clubs = ['Paris Saint-Germain', 'Olympique de Marseille', 'AS Monaco', 'Manchester United', 'Liverpool FC', 
                  'FC Barcelone', 'Real Madrid', 'Juventus Turin', 'Bayern Munich', 'Ajax Amsterdam'];
    const result = [];
    
    for (let i = 0; i < count; i++) {
      const club = clubs[Math.floor(Math.random() * clubs.length)];
      if (!result.includes(club)) {
        result.push(club);
      }
    }
    
    return result;
  }
  
  private getRandomCoachSpecialty(): string {
    const specialties = ['Formation de jeunes', 'Tactique défensive', 'Jeu offensif', 'Préparation physique', 'Développement individuel'];
    return specialties[Math.floor(Math.random() * specialties.length)];
  }
  
  private getRandomAgencyName(): string {
    const agencies = ['Elite Sports Management', 'Global Football Agency', 'Pro Player Representation', 'Top Talent Agency', 'Sports Career Management'];
    return agencies[Math.floor(Math.random() * agencies.length)];
  }
  
  private getRandomRegion(): string {
    const regions = ['Europe', 'Amérique du Sud', 'Afrique', 'Asie', 'France', 'Espagne', 'Angleterre', 'Allemagne', 'Italie'];
    return regions[Math.floor(Math.random() * regions.length)];
  }
  
  private getRandomCompany(): string {
    const companies = ['SportBrand', 'TechCorp', 'GlobalEnergy', 'MediaGroup', 'FinancePartners', 'AutoMakers', 'FoodBeverages'];
    return companies[Math.floor(Math.random() * companies.length)] + ' ' + ['Inc', 'SA', 'Ltd', 'Group'][Math.floor(Math.random() * 4)];
  }
  
  private getRandomInvestmentRange(): string {
    const ranges = ['10K-50K EUR', '50K-100K EUR', '100K-500K EUR', '500K-1M EUR', '1M-5M EUR', '5M+ EUR'];
    return ranges[Math.floor(Math.random() * ranges.length)];
  }
  
  private getRandomSponsorInterests(): string {
    const interests = ['Clubs de premier plan', 'Jeunes talents', 'Événements sportifs', 'Équipements', 'Droits médiatiques', 'Académies'];
    return interests[Math.floor(Math.random() * interests.length)];
  }
}


