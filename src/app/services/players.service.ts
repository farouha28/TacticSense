import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Player, RecommendationType } from '../pages/players/players-list/players-list.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private apiUrl = environment.apiUrl;

  // Données de démonstration pour le développement
  private mockPlayers: Player[] = [
    {
      id: 1,
      name: 'Kylian Mbappé',
      photo: 'assets/images/players/mbappe.jpg',
      age: 24,
      nationality: 'France',
      position: 'Attaquant',
      club: 'Real Madrid',
      club_logo: 'assets/images/clubs/real_madrid.png',
      marketValue: 180,
      goals: 155,
      assists: 38,
      attributes: {
        'Vitesse': 96,
        'Finition': 92,
        'Dribble': 90,
        'Passes': 85,
        'Physique': 78,
        'Défense': 45
      }
    },
    {
      id: 2,
      name: 'Erling Haaland',
      photo: 'assets/images/players/haaland.jpg',
      age: 23,
      nationality: 'Norvège',
      position: 'Attaquant',
      club: 'Manchester City',
      club_logo: 'assets/images/clubs/manchester_city.png',
      marketValue: 170,
      goals: 170,
      assists: 38,
      attributes: {
        'Finition': 95,
        'Puissance': 94,
        'Vitesse': 88,
        'Positionnement': 92,
        'Passes': 75,
        'Dribble': 80
      }
    },
    {
      id: 3,
      name: 'Jude Bellingham',
      photo: 'assets/images/players/bellingham.jpg',
      age: 20,
      nationality: 'Angleterre',
      position: 'Milieu',
      club: 'Real Madrid',
      club_logo: 'assets/images/clubs/real_madrid.png',
      marketValue: 150,
      goals: 45,
      assists: 52,
      attributes: {
        'Technique': 90,
        'Vision': 88,
        'Passes': 87,
        'Endurance': 92,
        'Défense': 82,
        'Finition': 84
      }
    },
    {
      id: 4,
      name: 'Florian Wirtz',
      photo: 'assets/images/players/wirtz.jpg',
      age: 20,
      nationality: 'Allemagne',
      position: 'Milieu',
      club: 'Bayer Leverkusen',
      club_logo: 'assets/images/clubs/leverkusen.png',
      marketValue: 130,
      goals: 38,
      assists: 45,
      attributes: {
        'Technique': 92,
        'Vision': 90,
        'Passes': 89,
        'Dribble': 91,
        'Finition': 85,
        'Défense': 65
      }
    },
    {
      id: 5,
      name: 'Rodri',
      photo: 'assets/images/players/rodri.jpg',
      age: 27,
      nationality: 'Espagne',
      position: 'Milieu',
      club: 'Manchester City',
      club_logo: 'assets/images/clubs/manchester_city.png',
      marketValue: 120,
      goals: 25,
      assists: 30,
      attributes: {
        'Passes': 92,
        'Vision': 90,
        'Défense': 88,
        'Physique': 87,
        'Technique': 85,
        'Finition': 75
      }
    },
    {
      id: 6,
      name: 'William Saliba',
      photo: 'assets/images/players/saliba.jpg',
      age: 22,
      nationality: 'France',
      position: 'Défenseur',
      club: 'Arsenal',
      club_logo: 'assets/images/clubs/arsenal.png',
      marketValue: 90,
      goals: 5,
      assists: 3,
      attributes: {
        'Défense': 90,
        'Physique': 88,
        'Vitesse': 85,
        'Passes': 82,
        'Technique': 80,
        'Finition': 45
      }
    },
    {
      id: 7,
      name: 'Gianluigi Donnarumma',
      photo: 'assets/images/players/donnarumma.jpg',
      age: 24,
      nationality: 'Italie',
      position: 'Gardien',
      club: 'Paris Saint-Germain',
      club_logo: 'assets/images/clubs/psg.png',
      marketValue: 80,
      goals: 0,
      assists: 0,
      attributes: {
        'Réflexes': 92,
        'Plongeon': 90,
        'Positionnement': 88,
        'Jeu au pied': 80,
        'Dégagement': 85,
        'Prise de balle': 89
      }
    },
    {
      id: 8,
      name: 'Lamine Yamal',
      photo: 'assets/images/players/yamal.jpg',
      age: 16,
      nationality: 'Espagne',
      position: 'Attaquant',
      club: 'FC Barcelone',
      club_logo: 'assets/images/clubs/barcelona.png',
      marketValue: 90,
      goals: 15,
      assists: 20,
      attributes: {
        'Dribble': 92,
        'Technique': 90,
        'Vitesse': 88,
        'Vision': 85,
        'Finition': 82,
        'Défense': 50
      }
    },
    {
      id: 9,
      name: 'Jamal Musiala',
      photo: 'assets/images/players/musiala.jpg',
      age: 21,
      nationality: 'Allemagne',
      position: 'Milieu',
      club: 'Bayern Munich',
      club_logo: 'assets/images/clubs/bayern.png',
      marketValue: 110,
      goals: 40,
      assists: 35,
      attributes: {
        'Dribble': 94,
        'Technique': 92,
        'Vision': 88,
        'Finition': 86,
        'Passes': 85,
        'Défense': 60
      }
    }
  ];

  constructor(private http: HttpClient) { }

  getAllPlayers(): Observable<Player[]> {
    // En production, utilisez cette ligne pour appeler l'API
    // return this.http.get<Player[]>(`${this.apiUrl}/players`);
    
    // Pour le développement, utilisez les données mockées
    return of(this.mockPlayers);
  }

  getRecommendations(type: RecommendationType, position?: string): Observable<Player[]> {
    // En production, utilisez cette ligne pour appeler l'API
    // return this.http.get<Player[]>(`${this.apiUrl}/recommendations?type=${type}&position=${position || ''}`);
    
    // Pour le développement, simulez les recommandations
    let recommendations = [...this.mockPlayers];
    
    // Ajouter des scores de compatibilité pour la démonstration
    if (type === RecommendationType.FIT_SCORE) {
      recommendations = recommendations.map(player => ({
        ...player,
        compatibility: Math.floor(Math.random() * 30) + 70, // Score entre 70 et 99
      })).sort((a, b) => (b.compatibility || 0) - (a.compatibility || 0));
    } 
    else if (type === RecommendationType.HIDDEN_VALUE) {
      // Trier par potentiel caché (simulé par l'âge inversé et les attributs)
      recommendations = recommendations.sort((a, b) => {
        const aScore = (30 - a.age) * 3 + Object.values(a.attributes || {}).reduce((sum, val) => sum + val, 0) / 6;
        const bScore = (30 - b.age) * 3 + Object.values(b.attributes || {}).reduce((sum, val) => sum + val, 0) / 6;
        return bScore - aScore;
      });
    } 
    else if (type === RecommendationType.POSITION && position) {
      // Filtrer par position et trier par attributs pertinents
      recommendations = recommendations
        .filter(player => player.position === position)
        .sort((a, b) => {
          const getPositionScore = (player: Player) => {
            const attrs = player.attributes || {};
            if (position === 'Gardien') {
              return (attrs['Réflexes'] || 0) + (attrs['Plongeon'] || 0) + (attrs['Positionnement'] || 0);
            } else if (position === 'Défenseur') {
              return (attrs['Défense'] || 0) + (attrs['Physique'] || 0) + (attrs['Vitesse'] || 0);
            } else if (position === 'Milieu') {
              return (attrs['Passes'] || 0) + (attrs['Vision'] || 0) + (attrs['Technique'] || 0);
            } else { // Attaquant
              return (attrs['Finition'] || 0) + (attrs['Vitesse'] || 0) + (attrs['Dribble'] || 0);
            }
          };
          return getPositionScore(b) - getPositionScore(a);
        });
    }
    
    return of(recommendations);
  }
}







