export interface Player {
  id: number;
  name: string;
  photo: string;
  age: number;
  nationality: string;
  position: string;
  club: string;
  status: string;
  trophies: number;
  goals: number;
  assists: number;
  marketValue: number;
  compatibility?: number;
  potential?: number;
  attributes: {
    [key: string]: number;
  };
  useDefaultImage?: boolean;
}