import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.scss'],
})
export class ClubsListComponent implements OnInit {
  searchQuery: string = '';
  countryFilter: string = '';
  leagueFilter: string = '';
  budgetFilter: string = '';
  
  clubs = [
    {
      id: 1,
      name: 'Paris Saint-Germain',
      logo: 'assets/images/clubs/psg.png',
      country: 'France',
      league: 'Ligue 1',
      players: 32,
      trophies: 45,
      budget: 'high',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Real Madrid',
      logo: 'assets/images/clubs/real.png',
      country: 'Espagne',
      league: 'La Liga',
      players: 28,
      trophies: 95,
      budget: 'high',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Manchester City',
      logo: 'assets/images/clubs/mancity.png',
      country: 'Angleterre',
      league: 'Premier League',
      players: 30,
      trophies: 32,
      budget: 'high',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Bayern Munich',
      logo: 'assets/images/clubs/bayern.png',
      country: 'Allemagne',
      league: 'Bundesliga',
      players: 29,
      trophies: 82,
      budget: 'high',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Liverpool',
      logo: 'assets/images/clubs/liverpool.png',
      country: 'Angleterre',
      league: 'Premier League',
      players: 31,
      trophies: 67,
      budget: 'high',
      status: 'Active',
    },
    {
      id: 6,
      name: 'AC Milan',
      logo: 'assets/images/clubs/milan.png',
      country: 'Italie',
      league: 'Serie A',
      players: 27,
      trophies: 49,
      budget: 'medium',
      status: 'Active',
    },
    {
      id: 7,
      name: 'Olympique Lyonnais',
      logo: 'assets/images/clubs/lyon.png',
      country: 'France',
      league: 'Ligue 1',
      players: 29,
      trophies: 18,
      budget: 'medium',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Borussia Dortmund',
      logo: 'assets/images/clubs/dortmund.png',
      country: 'Allemagne',
      league: 'Bundesliga',
      players: 30,
      trophies: 22,
      budget: 'medium',
      status: 'Active',
    }
  ];
  
  filteredClubs = [...this.clubs];

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredClubs = this.clubs.filter(club => {
      // Filtre de recherche
      if (this.searchQuery && !club.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filtre par pays
      if (this.countryFilter && club.country !== this.countryFilter) {
        return false;
      }
      
      // Filtre par ligue
      if (this.leagueFilter && club.league !== this.leagueFilter) {
        return false;
      }
      
      // Filtre par budget
      if (this.budgetFilter && club.budget !== this.budgetFilter) {
        return false;
      }
      
      return true;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.countryFilter = '';
    this.leagueFilter = '';
    this.budgetFilter = '';
    this.filteredClubs = [...this.clubs];
  }

  showClubProfile(club: any): void {
    // Implémentation du dialogue de profil
    console.log('Afficher le profil du club:', club);
  }
}

