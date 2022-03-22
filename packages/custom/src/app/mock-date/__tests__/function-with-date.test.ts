import { now } from 'packages/custom/src/app/mock-date/function-with-date';

describe('function-with-date', () => {
  it('should return mock date within jest', () => {
    jest.useFakeTimers().setSystemTime(new Date('2022-02-02'));

    expect(now().toDateString()).toBe('Wed Feb 02 2022');

    jest.useRealTimers();

    expect(now().toDateString()).toEqual(new Date().toDateString());
  });
});
