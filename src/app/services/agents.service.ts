import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Agent {
  id: number;
  name: string;
  nationality: string;
  clients: number;
  topClient: string;
  transfersValue: number; // en millions €
  commission: number; // pourcentage
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  private agents: Agent[] = [
    {
      id: 1,
      name: 'Jorge Mendes',
      nationality: 'Portugal',
      clients: 115,
      topClient: 'Cristiano Ronaldo',
      transfersValue: 1200,
      commission: 10,
      image: 'https://example.com/mendes.jpg'
    },
    {
      id: 2,
      name: 'Mino Raiola',
      nationality: 'Italie',
      clients: 85,
      topClient: 'Erling Haaland',
      transfersValue: 950,
      commission: 12,
      image: 'https://example.com/raiola.jpg'
    },
    {
      id: 3,
      name: 'Jonathan Barnett',
      nationality: 'Angleterre',
      clients: 70,
      topClient: 'Gareth Bale',
      transfersValue: 850,
      commission: 8,
      image: 'https://example.com/barnett.jpg'
    }
  ];

  getAllAgents(): Observable<Agent[]> {
    return of(this.agents);
  }

  getAgentById(id: number): Observable<Agent | undefined> {
    return of(this.agents.find(a => a.id === id));
  }
}

