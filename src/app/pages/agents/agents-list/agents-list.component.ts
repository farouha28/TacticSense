import { Component, OnInit } from '@angular/core';
import { AgentsService, Agent } from '../agents.service';

@Component({
  selector: 'ngx-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.scss'],
})
export class AgentsListComponent implements OnInit {
  agents: Agent[] = [];
  filteredAgents: Agent[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  nationalityFilter: string = 'all';
  nationalities: string[] = ['all', 'Portugal', 'Italie', 'Angleterre', 'Israël', 'Pays-Bas', 'Brésil'];

  constructor(private agentsService: AgentsService) {}

  ngOnInit() {
    this.loadAgents();
  }

  loadAgents() {
    this.isLoading = true;
    this.agentsService.getAgents().subscribe(
      (data) => {
        this.agents = data;
        this.filteredAgents = [...this.agents];
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des agents', error);
        this.isLoading = false;
      }
    );
  }

  onSearchChange() {
    this.applyFilters();
  }

  onNationalityChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.agentsService.searchAgents(this.searchQuery, this.nationalityFilter).subscribe(
      (data) => {
        this.filteredAgents = data;
      }
    );
  }
}

