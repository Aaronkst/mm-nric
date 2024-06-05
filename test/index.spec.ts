import { expect } from 'chai';
import { getListByCode, validateNric } from '../src';

describe('NRIC Test', (): void => {
  it('List by Code', (): void => {
    expect(getListByCode(1)).length.greaterThanOrEqual(0);
  });

  it('Validate Nric (Success)', (): void => {
    expect(validateNric('12/PaZaDa(N)036558')).to.be.equal(true);
  });

  it('Validate Nric (Fail)', (): void => {
    expect(validateNric('')).to.be.equal(false);
  });
});
