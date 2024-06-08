/* eslint-disable no-useless-escape */
import states from './data/states.json';
import districts from './data/districts.json';
import { District, NricTypesEn, NricTypesMm, State } from './index.interface';
import { convertEn, convertMm, regx_eng, regx_mm } from './lang';

/* Fetching */

/**
 * Get list of states
 * @returns State[]
 */
export function getStates(): State[] {
  return states;
}

/**
 * Get list of districts
 * @returns State[]
 */
export function getDistricts(): State[] {
  return districts;
}

/**
 * Get list of districts by state
 * @param state The state code (1 - 14)
 * @return District[]
 */
export function getDistrictsByState(state: number): District[] {
  if (!validateState(state)) return [];
  const _list = districts.filter((nric) => nric.code === state);
  return _list;
}

/* Validation */

/**
 * Validate state code
 * @returns boolean
 */
export function validateState(state: number): boolean {
  return !(state < 1 || state > 14);
}

/**
 * Validate nric type
 * @returns boolean
 */
export function validateNricType(type: string): boolean {
  const checkEn = Object.values(NricTypesEn).includes(
    type.toUpperCase() as NricTypesEn
  );
  const checkMm = Object.values(NricTypesMm).includes(
    type.toUpperCase() as NricTypesMm
  );
  return checkEn || checkMm;
}

/**
 * Validate if provided string is a valid nric format
 * @param nric The nric string to check
 * @returns 'en' for english valid nric, 'mm' for myanmar valid nric and false for invalid nric
 */
export function validateNricFormat(nric: string): 'en' | 'mm' | boolean {
  try {
    if (regx_eng.test(nric)) return 'en';
    if (regx_mm.test(nric)) return 'mm';
    return false;
  } catch {
    return false;
  }
}

/**
 * Validate if provided string is a valid nric
 * @param nric The nric string to check
 * @returns boolean
 */
export function validateNric(nric: string): boolean {
  try {
    if (validateNricFormat(nric)) return false;

    // eslint-disable-next-line prefer-const
    let [code, string] = nric.split('/');
    string = string.replace(/[\(\)\s]/g, '');

    if (
      (string.length !== 13 && string.length !== 9) ||
      isNaN(code as unknown as number)
    )
      return false;

    const parsedCode = parseFloat(code);
    if (parsedCode < 1 || parsedCode > 14) return false;

    const nricNumber = string.slice(-6);
    if (isNaN(nricNumber as unknown as number)) return false;

    const townLength = string.length === 13 ? 6 : 3;
    const nricType = string.length === 13 ? string[6] : string[3];
    if (!validateNricType(nricType)) return false;

    // TODO: Validate NRIC Types
    // console.log('nricType', nricType);

    const town = string.slice(0, townLength);

    const checkNric = districts.findIndex(
      (n) => n.en.toLowerCase() === town.toLowerCase() || n.mm.includes(town)
    );

    return checkNric !== -1;
  } catch {
    return false;
  }
}

/* Conversion */
export function convertToEnglish(nric: string): string {
  if (!validateNricFormat(nric)) throw new Error('Invalid Nric Format');
  return convertEn(nric);
}

export function convertToMyanmar(nric: string): string {
  if (!validateNricFormat(nric)) throw new Error('Invalid Nric Format');
  return convertMm(nric);
}
