import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TextAnalysisResult, UserRole } from '../models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class TextAnalysisService {
  private readonly API_URL = 'https://api.sportlink.com/analysis';
  
  constructor(private http: HttpClient) {}
  
  analyzeText(text: string, role: UserRole): Observable<TextAnalysisResult> {
    // En production, décommenter la ligne ci-dessous pour utiliser l'API réelle
    // return this.http.post<TextAnalysisResult>(`${this.API_URL}/text`, { text, role });
    
    // Pour le développement, simuler une analyse de texte
    return this.mockAnalysis(text, role).pipe(
      delay(1500), // Simuler un délai réseau
    );
  }
  
  private mockAnalysis(text: string, role: UserRole): Observable<TextAnalysisResult> {
    const result: TextAnalysisResult = {
      extractedData: {},
      confidence: 0.85,
    };
    
    // Extraire le nom complet (si présent)
    const nameMatch = text.match(/(?:je m'appelle|je suis|mon nom est) ([A-Za-zÀ-ÖØ-öø-ÿ\s-]+)(?:,|\.|et)/i);
    if (nameMatch) {
      result.extractedData.full_name = nameMatch[1].trim();
    }
    
    // Extraire l'âge (si présent)
    const ageMatch = text.match(/(?:j'ai|âgé de) (\d+) ans/i);
    if (ageMatch) {
      result.extractedData.age = parseInt(ageMatch[1], 10);
    }
    
    // Extraire des informations spécifiques au rôle
    switch (role) {
      case UserRole.PLAYER:
        this.extractPlayerInfo(text, result.extractedData);
        break;
        
      case UserRole.COACH:
        this.extractCoachInfo(text, result.extractedData);
        break;
        
      case UserRole.AGENT:
        this.extractAgentInfo(text, result.extractedData);
        break;
        
      case UserRole.RECRUITER:
        this.extractRecruiterInfo(text, result.extractedData);
        break;
        
      case UserRole.SPONSOR:
        this.extractSponsorInfo(text, result.extractedData);
        break;
    }
    
    return of(result);
  }
  
  private extractPlayerInfo(text: string, extractedData: any): void {
    // Extraire la position
    const positionMatch = text.match(/(?:je suis|je joue|poste de) ([A-Za-zÀ-ÖØ-öø-ÿ\s]+?)(?:,|\.|et|au|en)/i);
    if (positionMatch) {
      const position = positionMatch[1].trim().toLowerCase();
      if (position.includes('attaquant') || position.includes('avant')) {
        extractedData.position = 'Attaquant';
      } else if (position.includes('milieu')) {
        extractedData.position = position.includes('défensif') ? 'Milieu défensif' : 'Milieu offensif';
      } else if (position.includes('défenseur')) {
        extractedData.position = position.includes('central') ? 'Défenseur central' : 'Arrière latéral';
      } else if (position.includes('gardien') || position.includes('goal')) {
        extractedData.position = 'Gardien de but';
      }
    }
    
    // Extraire la ligue
    const ligueMatch = text.match(/(?:en|dans la|dans le) ([A-Za-zÀ-ÖØ-öø-ÿ\s0-9]+?)(?:,|\.|et)/i);
    if (ligueMatch) {
      const ligue = ligueMatch[1].trim();
      if (ligue.match(/ligue 1|ligue1/i)) {
        extractedData.league = 'Ligue 1';
      } else if (ligue.match(/premier league|premierleague/i)) {
        extractedData.league = 'Premier League';
      } else if (ligue.match(/liga|laliga/i)) {
        extractedData.league = 'La Liga';
      } else if (ligue.match(/serie a|seriea/i)) {
        extractedData.league = 'Serie A';
      } else if (ligue.match(/bundesliga/i)) {
        extractedData.league = 'Bundesliga';
      }
    }
    
    // Extraire le club
    const clubMatch = text.match(/(?:je joue pour|au|avec|dans) (?:le |l'|la |les )?([\w\s-]+?)(?:,|\.|et)/i);
    if (clubMatch) {
      const club = clubMatch[1].trim();
      if (club.match(/paris|psg/i)) {
        extractedData.current_club = 'Paris Saint-Germain';
      } else if (club.match(/marseille|om/i)) {
        extractedData.current_club = 'Olympique de Marseille';
      } else if (club.match(/lyon|ol/i)) {
        extractedData.current_club = 'Olympique Lyonnais';
      } else if (club.match(/monaco/i)) {
        extractedData.current_club = 'AS Monaco';
      } else if (club.match(/barcelone|barça|barca/i)) {
        extractedData.current_club = 'FC Barcelone';
      } else if (club.match(/madrid|real/i)) {
        extractedData.current_club = 'Real Madrid';
      } else if (club.match(/manchester|united|man u/i)) {
        extractedData.current_club = 'Manchester United';
      } else if (club.match(/liverpool/i)) {
        extractedData.current_club = 'Liverpool FC';
      } else {
        extractedData.current_club = club;
      }
    }
  }
  
  private extractCoachInfo(text: string, extractedData: any): void {
    // Extraire les années d'expérience
    const experienceMatch = text.match(/(?:j'ai|avec) (\d+) ans d'expérience/i);
    if (experienceMatch) {
      extractedData.experience_years = parseInt(experienceMatch[1], 10);
    }
    
    // Extraire les équipes entraînées
    const teamsMatch = text.match(/(?:j'ai entraîné|j'ai coaché|j'ai dirigé) ([^.]+)/i);
    if (teamsMatch) {
      extractedData.teams_coached = teamsMatch[1].trim();
    }
    
    // Extraire la spécialité
    const specialtyMatch = text.match(/(?:spécialisé dans|spécialité est|je me concentre sur) ([^.]+)/i);
    if (specialtyMatch) {
      extractedData.specialty = specialtyMatch[1].trim();
    }
  }
  
  private extractAgentInfo(text: string, extractedData: any): void {
    // Extraire le nom de l'agence
    const agencyMatch = text.match(/(?:je travaille pour|mon agence s'appelle|je dirige) ([^.]+?)(?:,|\.|et)/i);
    if (agencyMatch) {
      extractedData.agency_name = agencyMatch[1].trim();
    }
    
    // Extraire le nombre de clients
    const clientsMatch = text.match(/(?:j'ai|avec|représente) (\d+) (?:joueurs|clients|athlètes)/i);
    if (clientsMatch) {
      extractedData.clients_number = parseInt(clientsMatch[1], 10);
    }
    
    // Extraire le numéro de certification
    const certificationMatch = text.match(/(?:certification|licence|numéro) (?:est |:)?([A-Z0-9-]+)/i);
    if (certificationMatch) {
      extractedData.certification_number = certificationMatch[1].trim();
    }
  }
  
  private extractRecruiterInfo(text: string, extractedData: any): void {
    // Extraire l'organisation
    const organizationMatch = text.match(/(?:je travaille pour|je recrute pour|je représente) ([^.]+?)(?:,|\.|et)/i);
    if (organizationMatch) {
      extractedData.organization = organizationMatch[1].trim();
    }
    
    // Extraire la région
    const regionMatch = text.match(/(?:je recrute en|je me concentre sur|je travaille en) ([^.]+?)(?:,|\.|et)/i);
    if (regionMatch) {
      extractedData.region = regionMatch[1].trim();
    }
    
    // Extraire les postes cibles
    const positionsMatch = text.match(/(?:je recherche des|je recrute des|je cible des) ([^.]+)/i);
    if (positionsMatch) {
      extractedData.target_positions = positionsMatch[1].trim();
    }
  }
  
  private extractSponsorInfo(text: string, extractedData: any): void {
    // Extraire l'entreprise
    const companyMatch = text.match(/(?:je représente|je travaille pour|mon entreprise est) ([^.]+?)(?:,|\.|et)/i);
    if (companyMatch) {
      extractedData.company = companyMatch[1].trim();
    }
    
    // Extraire la fourchette d'investissement
    const investmentMatch = text.match(/(?:investissement de|budget de|fourchette de) ([^.]+?)(?:euros|EUR|€)/i);
    if (investmentMatch) {
      extractedData.investment_range = investmentMatch[1].trim() + ' EUR';
    }
    
    // Extraire les intérêts
    const interestsMatch = text.match(/(?:intéressé par|nous ciblons|nous recherchons) ([^.]+)/i);
    if (interestsMatch) {
      extractedData.interested_in = interestsMatch[1].trim();
    }
  }
}


