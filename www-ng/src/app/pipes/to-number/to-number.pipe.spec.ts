import { ToNumberPipe } from 'app/pipes';

describe('ToNumberPipe', () => {
  const pipe = new ToNumberPipe();

  it('should transform string to number', function() {
    expect(pipe.transform('11.22')).toBe(11.22);
  });

  it('should return 0 when transform NaN', function() {
    expect(pipe.transform('a386')).toBe(0);
  });

  it('should return number when transform "005"', function() {
    expect(pipe.transform('005')).toBe(5);
  });

  it('should return 0 when transform empty string', function() {
    expect(pipe.transform('')).toBe(0);
  });

  it('should return standard lat/lng numbers when transform over floating string', function() {
    expect(pipe.transform('34.13470720000001')).toBe(34.134707);
  });

  it('should return standard lat/lng numbers when transform over floating string', function() {
    expect(pipe.transform('34.13452799999999')).toBe(34.134528);
  });

});
