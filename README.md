# Myanmar NRC

This package is to streamline development for myanmar nric input and verification.

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

const mmNric = require('mm-nric')

console.log(mmNric.getStates()
```

## Functions

*Generators*

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

*Validators*

### Validate State
Returns a boolean to check if the specified state code is valid.
\
NOTE: valid state codes are numbers ranging from 1 to 14
```ts
console.log(validateState(1)) // true
console.log(validateState(0)) // false
console.log(validateState(15)) // false
```

### Validate Nric Type
Returns a boolean to check if the specified nric type is valid. Useful to validate raw user inputs
```ts
console.log(validateNricType('N')) // true
console.log(validateNricType('A')) // false
```

### Validate Nric Format
Returns a boolean to check if the specified nric string is in valid format. Supports for both myanmar and english language.
```ts
console.log(validateNricFormat('12/PABADA(N)0XXXXX')) // en
console.log(validateNricFormat('၁၂/ပဘတ(နိုင်)၀xxxxx')) // mm
```

### Validate Nric (WIP)
Returns a boolean to check if the specified nric string is valid. Supports for both myanmar and english language.

**Currently only supports english NRIC**

```ts
console.log(validateNric('12/PABADA(N)0XXXXX')) // true
```

*Conversions*

### Convert To English
Convert the provided NRIC string from myanmar to english.
```ts
console.log(convertToEnglish('၁၂/ပဇတ(နိုင်)၀၀၀၀၀၀')) // 12/PAZATA(N)000000
```

### Convert To Myanmar
Convert the provided NRIC string from english to myanmar.
```ts
console.log(convertToEnglish('12/PAZATA(N)000000')) // ၁၂/ပဇတ(နိုင်)၀၀၀၀၀၀
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

### Nric Types

```ts
enum NricTypesEn {
  N = 'N',
  E = 'E',
  P = 'P',
}

enum NricTypesMm {
  N = 'နိုင်',
  E = 'ဧည့်',
  P = 'ပြု',
}
```
