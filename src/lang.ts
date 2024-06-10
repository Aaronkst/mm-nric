import { NricTypesMm } from './index.interface';
import { getDistrictsByState } from '.';

const MyanmarNumbers =
  '\u1040\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049';
const MyanmarCharacters =
  '\u1000\u1001\u1002\u1003\u1004\u1005\u1006\u1007\u1008\u100A\u100E\u100F\u1010\u1011\u1012\u1013\u1014\u1015\u1016\u1017\u1018\u1019\u101A\u101B\u101C\u101D\u101E\u101F\u1020\u1025\u1027';

export const regx_eng =
  /^([\d]{1,2})\/([a-zA-Z]{4,9})\((?:N|E|V|P|THA|THI)\)([\d]{6})$/i;

export const regx_mm = new RegExp(
  '^([' +
    MyanmarNumbers +
    ']{1,2})/([' +
    MyanmarCharacters +
    ']{3}|[' +
    MyanmarCharacters +
    ']{6})[(](?:' +
    NricTypesMm.N +
    '|' +
    NricTypesMm.E +
    '|' +
    NricTypesMm.P +
    ')[)]([' +
    MyanmarNumbers +
    ']{6})$'
);

const StatesMm: Record<string, string> = {
  '\u1000': 'KA',
  '\u1001': 'KHA',
  '\u1002': 'GA',
  '\u1003': 'GHA',
  '\u1004': 'NGA',
  '\u1005': 'CA',
  '\u1006': 'CHA',
  '\u1007': 'ZA',
  '\u1008': 'JHA',
  '\u1009': 'NYA',
  '\u100A': 'NNYA',
  '\u100B': 'TTA',
  '\u100C': 'TTHA',
  '\u100E': 'DDA',
  '\u100F': 'NNA',
  '\u1010': 'TA',
  '\u1011': 'THA',
  '\u1012': 'DA',
  '\u1013': 'DHA',
  '\u1014': 'NA',
  '\u1015': 'PA',
  '\u1016': 'PHA',
  '\u1017': 'BA',
  '\u1018': 'BHA',
  '\u1019': 'MA',
  '\u101A': 'YA',
  '\u101B': 'RA',
  '\u101C': 'LA',
  '\u101D': 'WA',
  '\u101E': 'SA',
  '\u101F': 'HA',
  '\u1020': 'LLA',
  '\u1021': 'A',
  '\u1022': 'SHAN A',
  '\u1023': 'I',
  '\u1024': 'II',
  '\u1025': 'U',
  '\u1026': 'UU',
  '\u1027': 'E',
  '\u1028': 'MON E',
  '\u1029': 'O',
  '\u102A': 'AU',
};

const StatesEn: Record<string, string> = {
  KA: '\u1000',
  KHA: '\u1001',
  GA: '\u1002',
  GHA: '\u1003',
  NGA: '\u1004',
  CA: '\u1005',
  CHA: '\u1006',
  ZA: '\u1007',
  JHA: '\u1008',
  NYA: '\u1009',
  NNYA: '\u100A',
  TTA: '\u100B',
  TTHA: '\u100C',
  DDA: '\u100E',
  NNA: '\u100F',
  TA: '\u1010',
  THA: '\u1011',
  DA: '\u1012',
  DHA: '\u1013',
  NA: '\u1014',
  PA: '\u1015',
  PHA: '\u1016',
  BA: '\u1017',
  BHA: '\u1018',
  MA: '\u1019',
  YA: '\u101A',
  RA: '\u101B',
  LA: '\u101C',
  WA: '\u101D',
  SA: '\u101E',
  HA: '\u101F',
  LLA: '\u1020',
  A: '\u1021',
  'SHAN A': '\u1022',
  I: '\u1023',
  II: '\u1024',
  U: '\u1025',
  UU: '\u1026',
  E: '\u1027',
  'MON E': '\u1028',
  O: '\u1029',
  AU: '\u102A',
};

export function convertEn(nric: string) {
  let _res = '';
  nric = nric.trim();
  for (let i = 0; i < nric.length; i++) {
    if (nric[i] === '/' || nric[i] === '(' || nric[i] === ')') {
      _res += nric[i];
    } else {
      const index = MyanmarNumbers.indexOf(nric[i]);
      if (index > -1) {
        _res += index;
      } else {
        if (StatesMm[nric[i]]) _res += StatesMm[nric[i]];
      }
    }
  }
  _res = _res.replace('NANGA', 'N');
  return _res;
}

export function convertMm(nric: string) {
  let _res = '';
  nric = nric.trim();

  const startIndex = nric.indexOf('/');
  const endIndex = nric.indexOf('(');

  const state = nric.split('/')[0];

  const districts = getDistrictsByState(parseFloat(state));

  const extracted = nric.substring(startIndex + 1, endIndex).trim();

  const district = districts.find((d) => d.en === extracted);

  if (!district) throw new Error('Invalid Nric');

  nric = nric.replace(extracted, '');

  for (let i = 0; i < nric.length; i++) {
    if (nric[i] === '/' || nric[i] === '(' || nric[i] === ')') {
      _res += nric[i];
    } else {
      const index = parseFloat(nric[i]);
      if (!isNaN(index)) {
        _res += MyanmarNumbers[index];
      } else {
        if (nric[i] in NricTypesMm) {
          // @ts-expect-error No hack
          _res += NricTypesMm[nric[i]];
        }
      }
    }
  }

  const tempRes = _res.split('/');
  _res = tempRes[0] + '/' + district.mm + tempRes[1];
  return _res;
}
