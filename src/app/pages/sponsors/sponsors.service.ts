import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Sponsor {
  id: number;
  name: string;
  logo: string;
  industry: string;
  founded: number;
  headquarters: string;
  revenue: number;
  sponsorshipValue: number;
  description: string;
  partnerships: {
    clubs: string[];
    players: string[];
    competitions: string[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class SponsorsService {
  private sponsors: Sponsor[] = [
    {
      id: 1,
      name: 'Nike',
      logo: 'assets/images/sponsors/nike.png',
      industry: 'Équipementier sportif',
      founded: 1964,
      headquarters: 'Beaverton, États-Unis',
      revenue: 44500,
      sponsorshipValue: 1200,
      description: 'Nike est l\'un des plus grands équipementiers sportifs au monde, spécialisé dans la conception, le développement et la commercialisation de chaussures, vêtements et équipements sportifs.',
      partnerships: {
        clubs: ['FC Barcelone', 'Paris Saint-Germain', 'Liverpool FC', 'Chelsea FC'],
        players: ['Cristiano Ronaldo', 'Kylian Mbappé', 'Kevin De Bruyne'],
        competitions: ['Premier League', 'Ligue 1']
      }
    },
    {
      id: 2,
      name: 'Adidas',
      logo: 'assets/images/sponsors/adidas.png',
      industry: 'Équipementier sportif',
      founded: 1949,
      headquarters: 'Herzogenaurach, Allemagne',
      revenue: 21915,
      sponsorshipValue: 1100,
      description: 'Adidas est une entreprise allemande spécialisée dans la fabrication d\'articles de sport, fondée par Adolf Dassler. Elle est l\'un des équipementiers sportifs les plus reconnus au monde.',
      partnerships: {
        clubs: ['Real Madrid', 'Manchester United', 'Bayern Munich', 'Juventus'],
        players: ['Lionel Messi', 'Paul Pogba', 'Mohamed Salah'],
        competitions: ['FIFA World Cup', 'UEFA Champions League']
      }
    },
    {
      id: 3,
      name: 'Emirates',
      logo: 'assets/images/sponsors/emirates.png',
      industry: 'Compagnie aérienne',
      founded: 1985,
      headquarters: 'Dubaï, Émirats arabes unis',
      revenue: 28300,
      sponsorshipValue: 800,
      description: 'Emirates est la compagnie aérienne nationale des Émirats arabes unis, basée à Dubaï. Elle est l\'un des sponsors les plus importants dans le monde du football.',
      partnerships: {
        clubs: ['Real Madrid', 'Arsenal FC', 'AC Milan', 'SL Benfica'],
        players: [],
        competitions: ['FA Cup', 'Copa del Rey']
      }
    },
    {
      id: 4,
      name: 'Puma',
      logo: 'assets/images/sponsors/puma.png',
      industry: 'Équipementier sportif',
      founded: 1948,
      headquarters: 'Herzogenaurach, Allemagne',
      revenue: 6805,
      sponsorshipValue: 650,
      description: 'Puma est une entreprise allemande spécialisée dans la fabrication d\'articles de sport fondée par Rudolf Dassler, frère d\'Adolf Dassler, fondateur d\'Adidas.',
      partnerships: {
        clubs: ['Manchester City', 'AC Milan', 'Borussia Dortmund'],
        players: ['Neymar Jr', 'Antoine Griezmann', 'Sergio Agüero'],
        competitions: ['Serie A']
      }
    },
    {
      id: 5,
      name: 'Qatar Airways',
      logo: 'assets/images/sponsors/qatar_airways.png',
      industry: 'Compagnie aérienne',
      founded: 1993,
      headquarters: 'Doha, Qatar',
      revenue: 14000,
      sponsorshipValue: 750,
      description: 'Qatar Airways est la compagnie aérienne nationale du Qatar. Elle est devenue un acteur majeur du sponsoring sportif, notamment dans le football.',
      partnerships: {
        clubs: ['Paris Saint-Germain', 'AS Roma', 'Boca Juniors'],
        players: [],
        competitions: ['FIFA Club World Cup']
      }
    },
    {
      id: 6,
      name: 'Volkswagen',
      logo: 'assets/images/sponsors/volkswagen.png',
      industry: 'Automobile',
      founded: 1937,
      headquarters: 'Wolfsburg, Allemagne',
      revenue: 250200,
      sponsorshipValue: 600,
      description: 'Volkswagen est un constructeur automobile allemand. Le groupe est impliqué dans le sponsoring sportif depuis de nombreuses années.',
      partnerships: {
        clubs: ['VfL Wolfsburg', 'Bayern Munich'],
        players: [],
        competitions: ['UEFA European Championship', 'DFB-Pokal']
      }
    }
  ];

  getSponsors(): Observable<Sponsor[]> {
    return of(this.sponsors).pipe(delay(1000));
  }

  getSponsorById(id: number): Observable<Sponsor | undefined> {
    const sponsor = this.sponsors.find(s => s.id === id);
    return of(sponsor).pipe(delay(500));
  }

  searchSponsors(query: string, industry?: string): Observable<Sponsor[]> {
    let filtered = [...this.sponsors];
    
    if (query) {
      const searchQuery = query.toLowerCase();
      filtered = filtered.filter(sponsor => 
        sponsor.name.toLowerCase().includes(searchQuery) || 
        sponsor.description.toLowerCase().includes(searchQuery) ||
        sponsor.headquarters.toLowerCase().includes(searchQuery)
      );
    }
    
    if (industry && industry !== 'all') {
      filtered = filtered.filter(sponsor => sponsor.industry === industry);
    }
    
    return of(filtered).pipe(delay(500));
  }
}

