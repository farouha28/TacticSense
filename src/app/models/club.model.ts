export interface Club {
  id: number;
  name: string;
  logo: string;
  city: string;
  country: string;
  league: string;
  founded: number;
  stadium: string;
  stadiumCapacity: number;
  marketValue: number;
  trophies: {
    league: number;
    national: number;
    international: number;
  };
  stats: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
}
