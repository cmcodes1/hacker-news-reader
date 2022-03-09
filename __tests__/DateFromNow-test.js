import dateFromNow from '../src/helpers/DateFromNow';

test('convert unix timestamp to time ago format', () => {
    expect(dateFromNow(1646805572)).toBe('6 hours ago');
});