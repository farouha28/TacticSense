import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-sponsors-list',
  templateUrl: './sponsors-list.component.html',
  styleUrls: ['./sponsors-list.component.scss'],
})
export class SponsorsListComponent implements OnInit {
  searchQuery: string = '';
  industryFilter: string = '';
  budgetFilter: string = '';
  statusFilter: string = '';
  
  sponsors = [
    {
      id: 1,
      name: 'Nike',
      logo: 'assets/images/sponsors/nike.png',
      industry: 'Équipement sportif',
      partnerships: 42,
      budget: 'high',
      website: 'www.nike.com',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Adidas',
      logo: 'assets/images/sponsors/adidas.png',
      industry: 'Équipement sportif',
      partnerships: 38,
      budget: 'high',
      website: 'www.adidas.com',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Emirates',
      logo: 'assets/images/sponsors/emirates.png',
      industry: 'Transport aérien',
      partnerships: 15,
      budget: 'high',
      website: 'www.emirates.com',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Puma',
      logo: 'assets/images/sponsors/puma.png',
      industry: 'Équipement sportif',
      partnerships: 25,
      budget: 'medium',
      website: 'www.puma.com',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Qatar Airways',
      logo: 'assets/images/sponsors/qatar.png',
      industry: 'Transport aérien',
      partnerships: 12,
      budget: 'high',
      website: 'www.qatarairways.com',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Heineken',
      logo: 'assets/images/sponsors/heineken.png',
      industry: 'Boissons',
      partnerships: 18,
      budget: 'medium',
      website: 'www.heineken.com',
      status: 'Pending',
    },
    {
      id: 7,
      name: 'Santander',
      logo: 'assets/images/sponsors/santander.png',
      industry: 'Finance',
      partnerships: 10,
      budget: 'medium',
      website: 'www.santander.com',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Etihad Airways',
      logo: 'assets/images/sponsors/etihad.png',
      industry: 'Transport aérien',
      partnerships: 8,
      budget: 'high',
      website: 'www.etihad.com',
      status: 'Inactive',
    }
  ];
  
  filteredSponsors = [...this.sponsors];

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredSponsors = this.sponsors.filter(sponsor => {
      // Filtre de recherche
      if (this.searchQuery && !sponsor.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filtre par industrie
      if (this.industryFilter && sponsor.industry !== this.industryFilter) {
        return false;
      }
      
      // Filtre par budget
      if (this.budgetFilter && sponsor.budget !== this.budgetFilter) {
        return false;
      }
      
      // Filtre par statut
      if (this.statusFilter && sponsor.status !== this.statusFilter) {
        return false;
      }
      
      return true;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.industryFilter = '';
    this.budgetFilter = '';
    this.statusFilter = '';
    this.filteredSponsors = [...this.sponsors];
  }

  showSponsorProfile(sponsor: any): void {
    // Implémentation du dialogue de profil
    console.log('Afficher le profil du sponsor:', sponsor);
  }
}



