import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.scss'],
})
export class AgentsListComponent implements OnInit {
  searchQuery: string = '';
  countryFilter: string = '';
  specialtyFilter: string = '';
  statusFilter: string = '';
  
  agents = [
    {
      id: 1,
      name: 'Jorge Mendes',
      photo: 'assets/images/agents/mendes.jpg',
      country: 'Portugal',
      agency: 'Gestifute',
      clients: 85,
      deals: 124,
      specialty: 'Transferts internationaux',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Mino Raiola',
      photo: 'assets/images/agents/raiola.jpg',
      country: 'Italie',
      agency: 'Raiola Agency',
      clients: 73,
      deals: 98,
      specialty: 'Jeunes talents',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Jonathan Barnett',
      photo: 'assets/images/agents/barnett.jpg',
      country: 'Angleterre',
      agency: 'Stellar Group',
      clients: 62,
      deals: 87,
      specialty: 'Contrats commerciaux',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Pini Zahavi',
      photo: 'assets/images/agents/zahavi.jpg',
      country: 'Israël',
      agency: 'Zahavi Sports',
      clients: 54,
      deals: 76,
      specialty: 'Transferts internationaux',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Volker Struth',
      photo: 'assets/images/agents/struth.jpg',
      country: 'Allemagne',
      agency: 'Sports360',
      clients: 48,
      deals: 65,
      specialty: 'Jeunes talents',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Moussa Sissoko',
      photo: 'assets/images/agents/sissoko.jpg',
      country: 'France',
      agency: 'Sissoko Agency',
      clients: 42,
      deals: 58,
      specialty: 'Contrats commerciaux',
      status: 'Pending',
    }
  ];
  
  filteredAgents = [...this.agents];

  constructor(private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredAgents = this.agents.filter(agent => {
      // Filtre de recherche
      if (this.searchQuery && !agent.name.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filtre par pays
      if (this.countryFilter && agent.country !== this.countryFilter) {
        return false;
      }
      
      // Filtre par spécialité
      if (this.specialtyFilter && agent.specialty !== this.specialtyFilter) {
        return false;
      }
      
      // Filtre par statut
      if (this.statusFilter && agent.status !== this.statusFilter) {
        return false;
      }
      
      return true;
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.countryFilter = '';
    this.specialtyFilter = '';
    this.statusFilter = '';
    this.filteredAgents = [...this.agents];
  }

  showAgentProfile(agent: any): void {
    // Implémentation du dialogue de profil
    console.log('Afficher le profil de l\'agent:', agent);
  }
}



