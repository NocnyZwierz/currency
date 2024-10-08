import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
    expect(convertPLNToUSD(0)).toBe('$0.00');
  });

  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('a')).toBeNaN();
    expect(convertPLNToUSD('asdasdas')).toBeNaN();
    expect(convertPLNToUSD('____')).toBeNaN();
  })

  it('should return NaN when input is empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  })

  it('should return error when input is not a number or text', () => {
    expect(convertPLNToUSD(true)).toBe('Error');
    expect(convertPLNToUSD(false)).toBe('Error');
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
    expect(convertPLNToUSD(()=> {})).toBe('Error');
  });

  it('should return zero when input is lower than zero', () => {
    expect(convertPLNToUSD(-9)).toBe('$0.00');
    expect(convertPLNToUSD(-5)).toBe('$0.00');
    expect(convertPLNToUSD(-666)).toBe('$0.00');
  });
});

