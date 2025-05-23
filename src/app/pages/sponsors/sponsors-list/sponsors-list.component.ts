import { Component, OnInit } from '@angular/core';
import { SponsorsService, Sponsor } from '../sponsors.service';

@Component({
  selector: 'ngx-sponsors-list',
  templateUrl: './sponsors-list.component.html',
  styleUrls: ['./sponsors-list.component.scss'],
})
export class SponsorsListComponent implements OnInit {
  sponsors: Sponsor[] = [];
  filteredSponsors: Sponsor[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  industryFilter: string = 'all';
  industries: string[] = ['all', 'Équipementier sportif', 'Compagnie aérienne', 'Automobile', 'Technologie', 'Finance', 'Boisson'];

  constructor(private sponsorsService: SponsorsService) {}

  ngOnInit() {
    this.loadSponsors();
  }

  loadSponsors() {
    this.isLoading = true;
    this.sponsorsService.getSponsors().subscribe(
      (data) => {
        this.sponsors = data;
        this.filteredSponsors = [...this.sponsors];
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des sponsors', error);
        this.isLoading = false;
      }
    );
  }

  onSearchChange() {
    this.applyFilters();
  }

  onIndustryChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.sponsorsService.searchSponsors(this.searchQuery, this.industryFilter).subscribe(
      (data) => {
        this.filteredSponsors = data;
      }
    );
  }
}





