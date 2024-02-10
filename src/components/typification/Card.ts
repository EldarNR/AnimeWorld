export type Info = {
  id: number;
  names: Name;
  status: string;
  description: string;
  posters: Posters;
  genres: string[];
};

export interface Posters {
  small: Small;
  medium: Medium;
  original: Original;
}

export interface Small {
  url: string;
  raw_base64_file: any;
}

export interface Medium {
  url: string;
  raw_base64_file: any;
}

export interface Original {
  url: string;
  raw_base64_file: any;
}

export interface Name {
  ru: string;
  en?: string;
  alternative?: string;
}
