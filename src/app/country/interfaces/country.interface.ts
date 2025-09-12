export interface Country {
  cca2: string;
  flag: string;
  flagSvg: string;
  name: string;
  nameSpa: string;
  capital: string;
  population: number;
  region: string;
  subRegion: string;
}

export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Antarctic';
