interface NrcType {
  en: string;
  mm: string;
  code: number;
}

export interface State extends NrcType {}

export interface District extends NrcType {
  fullEn: string;
  fullMm: string;
}

export enum NrcTypesEn {
  N = 'N',
  E = 'E',
  P = 'P',
}

export enum NrcTypesMm {
  N = 'နိုင်',
  E = 'ဧည့်',
  P = 'ပြု',
}
