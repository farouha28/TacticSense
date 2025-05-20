export enum UserRole {
  PLAYER = 'player',
  COACH = 'coach',
  AGENT = 'agent',
  RECRUITER = 'recruiter',
  SPONSOR = 'sponsor',
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  age: number;
  created_at: Date;
  updated_at: Date;
  
  // Champs spécifiques au rôle Joueur
  position?: string;
  league?: string;
  current_club?: string;
  appearances_overall?: number;
  annual_salary_eur?: number;
  
  // Champs spécifiques au rôle Entraîneur
  experience_years?: number;
  teams_coached?: string;
  specialty?: string;
  
  // Champs spécifiques au rôle Agent
  agency_name?: string;
  clients_number?: number;
  certification_number?: string;
  
  // Champs spécifiques au rôle Recruteur
  organization?: string;
  region?: string;
  target_positions?: string;
  
  // Champs spécifiques au rôle Sponsor
  company?: string;
  investment_range?: string;
  interested_in?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole;
  full_name: string;
  age: number;
  
  // Autres champs spécifiques au rôle
  [key: string]: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
  expires_at: string;
}

export interface TextAnalysisResult {
  extractedData: {
    [key: string]: any;
  };
  confidence: number;
}


