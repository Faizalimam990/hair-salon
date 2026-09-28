import { afterEach, describe, expect, it, vi } from 'vitest';
import { bookingErrors, bookingMessage, salonDate } from '../src/utils/booking';
import { whatsappUrl } from '../src/data/salon';
const valid = {
  name: 'Ayesha & family',
  service: 'Cuts & styling',
  date: '2026-10-02',
  time: 'Morning (10 am – 12 pm)',
  notes: 'Two people',
};
afterEach(() => vi.useRealTimers());
describe('appointment enquiry', () => {
  it('uses the salon’s timezone when the visitor is on another calendar date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-28T20:00:00Z'));
    expect(salonDate()).toBe('2026-09-29');
  });
  it('requires a name, service, future date and preferred time', () => {
    expect(
      Object.keys(bookingErrors({ name: ' ', service: '', date: '', time: '', notes: '' })),
    ).toEqual(['name', 'service', 'date', 'time']);
  });
  it('rejects past and impossible dates', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-28T12:00:00Z'));
    expect(bookingErrors({ ...valid, date: '2026-09-27' }).date).toBeTruthy();
    expect(bookingErrors({ ...valid, date: '2026-99-99' }).date).toBeTruthy();
    expect(bookingErrors({ ...valid, date: '2027-02-30' }).date).toBeTruthy();
  });
  it('accepts a complete future preference without promising availability', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-28T12:00:00Z'));
    expect(bookingErrors(valid)).toEqual({});
    expect(bookingMessage(valid)).toContain('Please confirm availability and pricing.');
  });
  it('safely encodes the complete message into the confirmed WhatsApp destination', () => {
    const message = bookingMessage({ ...valid, notes: 'A trim & style? + a facial #1' });
    const url = new URL(whatsappUrl(message));
    expect(url.origin + url.pathname).toBe('https://wa.me/916260716380');
    expect(url.searchParams.get('text')).toBe(message);
    expect(url.hash).toBe('');
    expect(message).toContain('2 October 2026');
  });
  it('omits blank notes and trims the name', () => {
    const message = bookingMessage({ ...valid, name: ' Ayesha ', notes: '   ' });
    expect(message).toContain('Name: Ayesha\n');
    expect(message).not.toContain('Notes:');
  });
});
