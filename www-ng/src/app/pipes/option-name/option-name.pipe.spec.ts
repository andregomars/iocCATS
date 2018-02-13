import { OptionName } from 'app/pipes';

describe('OptionName', () => {
  const pipe = new OptionName();
  const units = [
    { name: '', value: null },
    { name: 'n', value: 'count' },
    { name: '%', value: 'usage' }
  ];

  it('should transform "usage" to "%"', function() {
    expect(pipe.transform('usage', units)).toBe('%');
  });

  it('should transform "count" to "n"', function() {
    expect(pipe.transform('count', units)).toBe('n');
  });

  it('should transform unexpected enum to nothing', function() {
    expect(pipe.transform('test', units)).toBe('');
  });
});
