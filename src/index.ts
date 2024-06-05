/* eslint-disable no-useless-escape */
import data from './nrc.json';
import { Nric } from './types';

/**
 * Get List of Nrics by city code
 * @param code The city code
 */
export function getListByCode(code: number): Nric[] {
  const list = data.filter((nrc) => nrc.code === code);
  return list;
}

/**
 * Validate if provided string is a valid nric
 * @param nric The nric string to check
 */
export function validateNric(nric: string): boolean {
  try {
    if (!nric.includes('/')) return false;

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

    // TODO: Validate NRIC Types
    // console.log('nricType', nricType);

    const town = string.slice(0, townLength);

    const checkNric = data.findIndex(
      (n) => n.en.toLowerCase() === town.toLowerCase() || n.mm.includes(town)
    );

    return checkNric !== -1;
  } catch {
    return false;
  }
}

validateNric('12/PaZaDa(N)036558');
