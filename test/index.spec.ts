import { expect } from 'chai';
import {
  convertToEnglish,
  convertToMyanmar,
  getDistricts,
  getDistrictsByState,
  getStates,
  validateNric,
  validateNricType,
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

  it('Validate Nric Type - En (Success)', (): void => {
    expect(validateNricType('N')).to.be.equal(true);
  });

  it('Validate Nric Type - En (Fail)', (): void => {
    expect(validateNricType('Q')).to.be.equal(false);
  });

  it('Validate Nric Type - Mm (Success)', (): void => {
    expect(validateNricType('နိုင်')).to.be.equal(true);
  });

  it('Validate Nric Type - Mm (Fail)', (): void => {
    expect(validateNricType('န')).to.be.equal(false);
  });

  it('Validate Nric (Success) - EN', (): void => {
    expect(validateNric('12/PAZATA(N)123456')).to.be.equal(true);
  });

  it('Validate Nric (Success) - MM', (): void => {
    expect(validateNric('၁၂/ပဇတ(နိုင်)၁၂၃၄၅၆')).to.be.equal(true);
  });

  it('Validate Nric (Fail)', (): void => {
    expect(validateNric('12/PAZAT(N)000000')).to.be.equal(false);
  });
});

describe('Converter Test', (): void => {
  it('Convert to English', (): void => {
    expect(convertToEnglish('၁၂/ပဇတ(နိုင်)၁၂၃၄၅၆')).to.be.equal(
      '12/PAZATA(N)123456'
    );
  });

  it('Convert to Myanmar', (): void => {
    expect(convertToMyanmar('12/PAZATA(N)123456')).to.be.equal(
      '၁၂/ပဇတ(နိုင်)၁၂၃၄၅၆'
    );
  });
});
