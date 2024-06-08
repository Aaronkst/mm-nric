interface NricType {
  en: string;
  mm: string;
  code: number;
}

export interface State extends NricType {}

export interface District extends NricType {
  fullEn: string;
  fullMm: string;
}

export enum NricTypesEn {
  N = 'N',
  E = 'E',
  P = 'P',
}

export enum NricTypesMm {
  N = 'နိုင်',
  E = 'ဧည့်',
  P = 'ပြု',
}
