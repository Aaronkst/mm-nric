# Myanmar NRC

This package is to streamline development for myanmar nrc input and verification.

## Installation
Using npm:
```bash
npm install mm-nric
```
\
Using yarn:
```bash
yarn add mm-nric
```
\
Using pnpm:
```bash
pnpm add mm-nric
```
\
After installation you can use the package with either `import` or `requrie` approach.
\
Example
```js
import { getStates } from 'mm-nric'

console.log(getStates())

// OR

const mmNrc = require('mm-nric')

console.log(mmNrc.getStates()
```

## Functions

### Get States
Returns an array of all states.
```ts
const states = getStates()
```

### Get District
Returns an array of all districts.
```ts
const districts = getDistricts()
```

### Get District by state
Returns an array of districts included in the specified state. Useful for controlling the dropdown values based on the state that the user chose.
\
NOTE: This function will return an empty array for invalid state code.
```ts
const districts = getDistrictsByState(1)
```

### Validate State
Returns a boolean to check if the specified state code is valid.
\
NOTE: valid state codes are numbers ranging from 1 to 14
```ts
console.log(validateState(1)) // true
console.log(validateState(0)) // false
console.log(validateState(15)) // false
```

### Validate Nrc Type
Returns a boolean to check if the specified nrc type is valid. Useful to validate raw user inputs
```ts
console.log(validateNrcType('N')) // true
console.log(validateNrcType('A')) // false
```

### Validate Nrc
Returns a boolean to check if the specified nrc string is valid. Supports for both myanmar and english language.
```ts
console.log(validateNrcType('12/PABADA(N)0XXXXX')) // true
console.log(validateNrcType('၁၂/ပဘတ(နိုင်)၀xxxxx')) // true
```

## Data Types

### State

```ts
interface State {
  en: string;           /* English State Name */
  mm: string;           /* Burmese State Suffix */
  code: number;         /* The State code */
}
```

### District

```ts
interface District {
  en: string;           /* English District Suffix */
  mm: string;           /* Burmese District Suffix */
  code: number;         /* The State code */
  fullEn: string;       /* Full English District Name */
  fullMm: string;       /* Full Burmese District Name */
}
```

### Nrc Types

```ts
enum NrcTypesEn {
  N = 'N',
  E = 'E',
  P = 'P',
}

enum NrcTypesMm {
  N = 'နိုင်',
  E = 'ဧည့်',
  P = 'ပြု',
}
```
