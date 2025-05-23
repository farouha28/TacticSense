import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Agent {
  id: number;
  name: string;
  photo: string;
  nationality: string;
  age: number;
  agency: string;
  clients: number;
  topClients: string[];
  totalTransfers: number;
  transferValue: number;
  specialization: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AgentsService {
  private agents: Agent[] = [
    {
      id: 1,
      name: 'Jorge Mendes',
      photo: 'assets/images/agents/mendes.jpg',
      nationality: 'Portugal',
      age: 57,
      agency: 'Gestifute',
      clients: 98,
      topClients: ['Cristiano Ronaldo', 'Bernardo Silva', 'Rúben Dias'],
      totalTransfers: 145,
      transferValue: 1200,
      specialization: ['Joueurs portugais', 'Attaquants', 'Transferts internationaux'],
    },
    {
      id: 2,
      name: 'Mino Raiola',
      photo: 'assets/images/agents/raiola.jpg',
      nationality: 'Italie',
      age: 54,
      agency: 'Raiola Agency',
      clients: 77,
      topClients: ['Erling Haaland', 'Paul Pogba', 'Zlatan Ibrahimović'],
      totalTransfers: 120,
      transferValue: 950,
      specialization: ['Négociations salariales', 'Jeunes talents', 'Attaquants'],
    },
    {
      id: 3,
      name: 'Jonathan Barnett',
      photo: 'assets/images/agents/barnett.jpg',
      nationality: 'Angleterre',
      age: 71,
      agency: 'Stellar Group',
      clients: 85,
      topClients: ['Gareth Bale', 'Jack Grealish', 'Mason Mount'],
      totalTransfers: 110,
      transferValue: 850,
      specialization: ['Joueurs britanniques', 'Contrats publicitaires', 'Milieux offensifs'],
    },
    {
      id: 4,
      name: 'Pini Zahavi',
      photo: 'assets/images/agents/zahavi.jpg',
      nationality: 'Israël',
      age: 78,
      agency: 'Zahavi Sports Agency',
      clients: 65,
      topClients: ['Robert Lewandowski', 'Neymar Jr', 'Christopher Nkunku'],
      totalTransfers: 95,
      transferValue: 780,
      specialization: ['Transferts complexes', 'Stars internationales', 'Négociations de contrats'],
    }
  ];

  getAgents(): Observable<Agent[]> {
    return of(this.agents).pipe(delay(1000));
  }

  getAgentById(id: number): Observable<Agent | undefined> {
    const agent = this.agents.find(a => a.id === id);
    return of(agent).pipe(delay(500));
  }

  searchAgents(query: string, nationality?: string): Observable<Agent[]> {
    let filtered = [...this.agents];
    
    if (query) {
      const searchQuery = query.toLowerCase();
      filtered = filtered.filter(agent => 
        agent.name.toLowerCase().includes(searchQuery) || 
        agent.agency.toLowerCase().includes(searchQuery) ||
        agent.topClients.some(client => client.toLowerCase().includes(searchQuery))
      );
    }
    
    if (nationality && nationality !== 'all') {
      filtered = filtered.filter(agent => agent.nationality === nationality);
    }
    
    return of(filtered).pipe(delay(500));
  }
}
