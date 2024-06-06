/* eslint-disable no-useless-escape */
import states from './data/states.json';
import districts from './data/districts.json';
import { District, NrcTypesEn, NrcTypesMm, State } from './index.interface';

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
  const _list = districts.filter((nrc) => nrc.code === state);
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
 * Validate nrc type
 * @returns boolean
 */
export function validateNrcType(type: string): boolean {
  const checkEn = Object.values(NrcTypesEn).includes(
    type.toUpperCase() as NrcTypesEn
  );
  const checkMm = Object.values(NrcTypesMm).includes(
    type.toUpperCase() as NrcTypesMm
  );
  return checkEn || checkMm;
}

/**
 * Validate if provided string is a valid nric
 * @param nrc The nric string to check
 * @returns boolean
 */
export function validateNrc(nrc: string): boolean {
  try {
    if (!nrc.includes('/')) return false;

    // eslint-disable-next-line prefer-const
    let [code, string] = nrc.split('/');
    string = string.replace(/[\(\)\s]/g, '');

    if (
      (string.length !== 13 && string.length !== 9) ||
      isNaN(code as unknown as number)
    )
      return false;

    const parsedCode = parseFloat(code);
    if (parsedCode < 1 || parsedCode > 14) return false;

    const nrcNumber = string.slice(-6);
    if (isNaN(nrcNumber as unknown as number)) return false;

    const townLength = string.length === 13 ? 6 : 3;
    const nrcType = string.length === 13 ? string[6] : string[3];
    if (!validateNrcType(nrcType)) return false;

    // TODO: Validate NRIC Types
    // console.log('nricType', nricType);

    const town = string.slice(0, townLength);

    const checkNrc = districts.findIndex(
      (n) => n.en.toLowerCase() === town.toLowerCase() || n.mm.includes(town)
    );

    return checkNrc !== -1;
  } catch {
    return false;
  }
}
