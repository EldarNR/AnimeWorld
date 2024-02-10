export type Franchise = Franchisen;

export interface Franchisen {
  franchise: Franchise2;
  releases: Release[];
}

export interface Franchise2 {
  id: string;
  name: string;
}

export interface Release {
  id: number;
  code: string;
  ordinal: number;
  names: Names2;
}

export interface Names2 {
  ru: string;
  en: string;
  alternative?: string;
}
