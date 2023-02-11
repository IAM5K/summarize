import { TwelveHourFormatPipe } from './twelve-hour-format.pipe';

describe('TwelveHourFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new TwelveHourFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
