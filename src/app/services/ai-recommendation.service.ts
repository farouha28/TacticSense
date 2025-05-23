import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Player } from '../models/player.model';

export interface AIRecommendation {
  players: Player[];
  explanation: string;
  confidenceScore: number;
  modelUsed: string;
}

@Injectable({
  providedIn: 'root'
})
export class AIRecommendationService {

  constructor() { }

  getRecommendations(query: string): Observable<AIRecommendation> {
    // Simuler une analyse IA basée sur la requête
    const recommendation = this.generateRecommendation(query);
    
    // Simuler un délai de traitement
    return of(recommendation).pipe(delay(2000));
  }
  
  getModelRecommendations(modelType: 'fit_score' | 'hidden_value' | 'position_analysis'): Observable<AIRecommendation> {
    // Simuler une analyse IA basée sur le modèle sélectionné
    const recommendation = this.generateModelRecommendation(modelType);
    
    // Simuler un délai de traitement
    return of(recommendation).pipe(delay(2500));
  }
  
  private generateRecommendation(query: string): AIRecommendation {
    // Données fictives pour la démonstration
    const players: Player[] = [
      {
        id: 101,
        name: "Eduardo Camavinga",
        photo: "https://img.a.transfermarkt.technology/portrait/big/640323-1668165786.jpg",
        age: 20,
        nationality: "France",
        position: "Milieu",
        club: "Real Madrid",
        status: "Actif",
        trophies: 5,
        goals: 4,
        assists: 7,
        marketValue: 60,
        compatibility: 92,
        attributes: {
          "Technique": 87,
          "Physique": 85,
          "Mental": 82,
          "Défense": 80,
          "Attaque": 75
        }
      },
      {
        id: 102,
        name: "Gavi",
        photo: "https://img.a.transfermarkt.technology/portrait/big/646667-1668165786.jpg",
        age: 19,
        nationality: "Espagne",
        position: "Milieu",
        club: "FC Barcelone",
        status: "Actif",
        trophies: 3,
        goals: 2,
        assists: 12,
        marketValue: 70,
        compatibility: 88,
        attributes: {
          "Technique": 88,
          "Physique": 78,
          "Mental": 85,
          "Défense": 75,
          "Attaque": 80
        }
      }
    ];
    
    // Déterminer le modèle utilisé en fonction de la requête
    let modelUsed = 'fit_score';
    let explanation = "Basé sur votre requête, notre modèle de compatibilité tactique a identifié ces joueurs comme étant les plus adaptés à votre style de jeu. Ils présentent d'excellentes statistiques dans les domaines clés que vous recherchez.";
    
    if (query.toLowerCase().includes('valeur') || query.toLowerCase().includes('sous-estim')) {
      modelUsed = 'hidden_value';
      explanation = "Notre modèle de valeur cachée a identifié ces joueurs comme étant potentiellement sous-évalués sur le marché des transferts. Leurs performances récentes et leur potentiel de développement suggèrent qu'ils pourraient valoir beaucoup plus dans un futur proche.";
    } else if (query.toLowerCase().includes('poste') || query.toLowerCase().includes('position')) {
      modelUsed = 'position_analysis';
      explanation = "Notre modèle d'analyse par poste a identifié ces joueurs comme étant les plus prometteurs à leur poste. Ils présentent des caractéristiques techniques et physiques exceptionnelles qui les distinguent des autres joueurs de leur génération.";
    }
    
    return {
      players: players,
      explanation: explanation,
      confidenceScore: Math.floor(Math.random() * 15) + 85, // Score entre 85 et 99
      modelUsed: modelUsed
    };
  }
  
  private generateModelRecommendation(modelType: 'fit_score' | 'hidden_value' | 'position_analysis'): AIRecommendation {
    // Données fictives pour chaque type de modèle
    let players: Player[] = [];
    let explanation = "";
    
    if (modelType === 'fit_score') {
      players = [
        {
          id: 201,
          name: "Jude Bellingham",
          photo: "https://img.a.transfermarkt.technology/portrait/big/581678-1668165786.jpg",
          age: 20,
          nationality: "Angleterre",
          position: "Milieu",
          club: "Real Madrid",
          status: "Actif",
          trophies: 4,
          goals: 15,
          assists: 20,
          marketValue: 150,
          compatibility: 95,
          attributes: {
            "Technique": 90,
            "Physique": 85,
            "Mental": 92,
            "Défense": 82,
            "Attaque": 88
          }
        },
        {
          id: 202,
          name: "Florian Wirtz",
          photo: "https://img.a.transfermarkt.technology/portrait/big/521942-1668165786.jpg",
          age: 20,
          nationality: "Allemagne",
          position: "Milieu",
          club: "Bayer Leverkusen",
          status: "Actif",
          trophies: 2,
          goals: 10,
          assists: 15,
          marketValue: 85,
          compatibility: 92,
          attributes: {
            "Technique": 89,
            "Physique": 80,
            "Mental": 85,
            "Défense": 70,
            "Attaque": 85
          }
        }
      ];
      explanation = "Notre modèle de compatibilité tactique a identifié ces joueurs comme étant les plus adaptés à votre style de jeu. Ils présentent d'excellentes statistiques dans les domaines clés que vous recherchez et s'intégreraient parfaitement dans votre système.";
    } else if (modelType === 'hidden_value') {
      players = [
        {
          id: 301,
          name: "Jamal Musiala",
          photo: "https://img.a.transfermarkt.technology/portrait/big/580195-1668165786.jpg",
          age: 20,
          nationality: "Allemagne",
          position: "Milieu",
          club: "Bayern Munich",
          status: "Actif",
          trophies: 6,
          goals: 12,
          assists: 10,
          marketValue: 110,
          compatibility: 90,
          attributes: {
            "Technique": 92,
            "Physique": 78,
            "Mental": 85,
            "Défense": 65,
            "Attaque": 88
          }
        },
        {
          id: 302,
          name: "Xavi Simons",
          photo: "https://img.a.transfermarkt.technology/portrait/big/566931-1668165786.jpg",
          age: 20,
          nationality: "Pays-Bas",
          position: "Milieu",
          club: "RB Leipzig",
          status: "Actif",
          trophies: 2,
          goals: 8,
          assists: 12,
          marketValue: 40,
          compatibility: 87,
          attributes: {
            "Technique": 86,
            "Physique": 75,
            "Mental": 82,
            "Défense": 60,
            "Attaque": 84
          }
        }
      ];
      explanation = "Notre modèle de valeur cachée a identifié ces joueurs comme étant potentiellement sous-évalués sur le marché des transferts. Leurs performances récentes et leur potentiel de développement suggèrent qu'ils pourraient valoir beaucoup plus dans un futur proche. Ces joueurs représentent d'excellentes opportunités d'investissement.";
    } else {
      players = [
        {
          id: 401,
          name: "Lamine Yamal",
          photo: "https://img.a.transfermarkt.technology/portrait/big/922733-1668165786.jpg",
          age: 16,
          nationality: "Espagne",
          position: "Attaquant",
          club: "FC Barcelone",
          status: "Actif",
          trophies: 1,
          goals: 5,
          assists: 7,
          marketValue: 60,
          compatibility: 88,
          attributes: {
            "Technique": 90,
            "Physique": 75,
            "Mental": 82,
            "Défense": 60,
            "Attaque": 88
          }
        },
        {
          id: 402,
          name: "Endrick",
          photo: "https://img.a.transfermarkt.technology/portrait/big/868812-1668165786.jpg",
          age: 17,
          nationality: "Brésil",
          position: "Attaquant",
          club: "Real Madrid",
          status: "Actif",
          trophies: 2,
          goals: 10,
          assists: 3,
          marketValue: 55,
          compatibility: 85,
          attributes: {
            "Technique": 85,
            "Physique": 80,
            "Mental": 78,
            "Défense": 55,
            "Attaque": 90
          }
        }
      ];
      explanation = "Notre modèle d'analyse par poste a identifié ces joueurs comme étant les plus prometteurs à leur poste. Ils présentent des caractéristiques techniques et physiques exceptionnelles qui les distinguent des autres joueurs de leur génération.";
    }
    
    return {
      players: players,
      explanation: explanation,
      confidenceScore: Math.floor(Math.random() * 15) + 85, // Score entre 85 et 99
      modelUsed: modelType
    };
  }
}


