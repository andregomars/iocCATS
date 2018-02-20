import { ToTimePipe } from 'app/pipes';

describe('ToTimePipe', () => {
  const pipe = new ToTimePipe();

  it('should transform string to time', function() {
    const output = pipe.transform('20180212082401');
    const expected = new Date(2018, 1, 12, 8, 24, 1);
    expect(output).toEqual(expected);
  });

  it('should transform string with extra numbers in the end to time', function() {
    const output = pipe.transform('201802120824300005');
    const expected = new Date(2018, 1, 12, 8, 24, 30);
    expect(output).toEqual(expected);
  });

  it('should transform date only string to time', function() {
    const output = pipe.transform('20180215');
    const expected = new Date(2018, 1, 15, 0, 0, 0);
    expect(output).toEqual(expected);
  });

  it('should transform unexpected string to undefined', function() {
    const output = pipe.transform('201802');
    expect(output).toBe(undefined);
  });

});
