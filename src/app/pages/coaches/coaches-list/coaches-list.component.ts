import { Component, OnInit } from '@angular/core';
import { CoachesService } from '../../../services/coaches.service';
import { Coach } from '../../../models/coach.model';

@Component({
  selector: 'ngx-coaches-list',
  templateUrl: './coaches-list.component.html',
  styleUrls: ['./coaches-list.component.scss'],
})
export class CoachesListComponent implements OnInit {
  coaches: Coach[] = [];
  filteredCoaches: Coach[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  nationalityFilter: string = 'all';
  nationalities: string[] = ['all'];

  constructor(private coachesService: CoachesService) {}

  ngOnInit() {
    this.loadCoaches();
  }

  loadCoaches() {
    this.isLoading = true;
    this.coachesService.getCoaches().subscribe(
      (data) => {
        this.coaches = data;
        this.filteredCoaches = [...this.coaches];
        this.extractNationalities();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des entraîneurs', error);
        this.isLoading = false;
      }
    );
  }

  extractNationalities() {
    const uniqueNationalities = [...new Set(this.coaches.map(coach => coach.nationality))];
    this.nationalities = ['all', ...uniqueNationalities];
  }

  onSearchChange() {
    this.applyFilters();
  }

  onNationalityChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.coaches];

    // Appliquer le filtre de recherche
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(coach =>
        coach.name.toLowerCase().includes(query) ||
        coach.currentClub.toLowerCase().includes(query) ||
        coach.tacticalStyle.toLowerCase().includes(query)
      );
    }

    // Appliquer le filtre de nationalité
    if (this.nationalityFilter !== 'all') {
      filtered = filtered.filter(coach =>
        coach.nationality === this.nationalityFilter
      );
    }

    this.filteredCoaches = filtered;
  }

  getTotalTrophies(): number {
    return this.filteredCoaches.reduce((total, coach) => total + coach.trophies, 0);
  }

  formatValue(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M€';
    }
    return value.toLocaleString() + '€';
  }

  viewCoachProfile(coach: Coach) {
    console.log('Viewing coach profile:', coach.name);
    // Implement profile view logic
  }

  contactCoach(coach: Coach) {
    console.log('Contacting coach:', coach.name);
    alert(`Contacting ${coach.name}... This feature will be implemented soon!`);
  }
}



