import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../../../services/clubs.service';
import { Club } from '../../../models/club.model';

@Component({
  selector: 'ngx-clubs-list',
  templateUrl: './clubs-list.component.html',
  styleUrls: ['./clubs-list.component.scss'],
})
export class ClubsListComponent implements OnInit {
  clubs: Club[] = [];
  filteredClubs: Club[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  countryFilter: string = 'all';
  countries: string[] = ['all', 'Spain', 'England', 'France', 'Germany', 'Italy'];

  constructor(private clubsService: ClubsService) {}

  ngOnInit() {
    this.loadClubs();
  }

  loadClubs() {
    this.isLoading = true;
    this.clubsService.getClubs().subscribe(
      (data) => {
        this.clubs = data;
        this.filteredClubs = [...this.clubs];
        this.extractCountries();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des clubs', error);
        this.isLoading = false;
      }
    );
  }

  extractCountries() {
    const uniqueCountries = [...new Set(this.clubs.map(club => club.country))];
    this.countries = ['all', ...uniqueCountries];
  }

  onSearchChange() {
    this.applyFilters();
  }

  onCountryChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.clubs];

    // Filtre par recherche
    if (this.searchQuery.trim()) {
      filtered = filtered.filter(club =>
        club.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        club.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        club.country.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        club.league.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Filtre par pays
    if (this.countryFilter && this.countryFilter !== 'all') {
      filtered = filtered.filter(club => club.country === this.countryFilter);
    }

    this.filteredClubs = filtered;
  }
}


