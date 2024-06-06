import { expect } from 'chai';
import {
  getDistricts,
  getDistrictsByState,
  getStates,
  validateNrc,
  validateNrcType,
  validateState,
} from '../src';

describe('Main Test', (): void => {
  it('List States', (): void => {
    expect(getStates()).length.greaterThan(0);
  });

  it('List Districts', (): void => {
    expect(getDistricts()).length.greaterThan(0);
  });

  it('List Districts by State (Success)', (): void => {
    expect(getDistrictsByState(1)).length.greaterThan(0);
  });

  it('List Districts by State (Fail)', (): void => {
    expect(getDistrictsByState(0)).length.lessThan(1);
  });
});

describe('Validator Test', (): void => {
  it('Validate State (Success)', (): void => {
    expect(validateState(1)).to.be.equal(true);
  });

  it('Validate State (Fail)', (): void => {
    expect(validateState(0)).to.be.equal(false);
  });

  it('Validate Nric - En (Success)', (): void => {
    expect(validateNrcType('N')).to.be.equal(true);
  });

  it('Validate Nric - En (Fail)', (): void => {
    expect(validateNrcType('Q')).to.be.equal(false);
  });

  it('Validate Nric - Mm (Success)', (): void => {
    expect(validateNrcType('နိုင်')).to.be.equal(true);
  });

  it('Validate Nric - Mm (Fail)', (): void => {
    expect(validateNrcType('န')).to.be.equal(false);
  });

  it('Validate Nric (Success)', (): void => {
    expect(validateNrc('12/PaZaDa(N)036558')).to.be.equal(true);
  });

  it('Validate Nric (Fail)', (): void => {
    expect(validateNrc('')).to.be.equal(false);
  });

  it('Validate Nric (Success)', (): void => {
    expect(validateNrc('12/PaZaDa(N)036558')).to.be.equal(true);
  });

  it('Validate Nric (Fail)', (): void => {
    expect(validateNrc('')).to.be.equal(false);
  });
});
