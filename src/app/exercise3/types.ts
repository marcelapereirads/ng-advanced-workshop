export interface Country {
  description: string;
  id: string;
  highlightedDescription: string;
}

export interface State {
  id: number;
  code: string;
  countryCode: string;
  description: string;
}
