export interface Coach {
  id: number;
  name: string;
  photo: string;
  age: number;
  nationality: string;
  currentClub: string;
  experience: number;
  trophies: number;
  preferredFormation: string;
  tacticalStyle: string;
  achievements: string[];
  specialties: string[];
  languages: string[];
  contractUntil: string;
  marketValue: number;
  stats: {
    matchesCoached: number;
    winPercentage: number;
    goalsPerGame: number;
    cleanSheets: number;
  };
}
