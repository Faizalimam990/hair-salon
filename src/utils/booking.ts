import { salon } from '../data/salon';
export type BookingDetails = {
  name: string;
  service: string;
  date: string;
  time: string;
  notes: string;
};
export function salonDate() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}
export function bookingErrors(form: BookingDetails) {
  const errors: Record<string, string> = {};
  if (form.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).';
  if (!form.service) errors.service = 'Choose the service you have in mind.';
  if (!isValidDate(form.date) || form.date < salonDate())
    errors.date = 'Please choose today or a future date.';
  if (!form.time) errors.time = 'Choose a preferred time.';
  return errors;
}
export function bookingMessage(form: BookingDetails) {
  const date = new Date(`${form.date}T12:00:00+05:30`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
  return `Hi ${salon.name}, I'd like to enquire about an appointment.\n\nName: ${form.name.trim()}\nService: ${form.service}\nPreferred date: ${date}\nPreferred time: ${form.time}${form.notes.trim() ? `\nNotes: ${form.notes.trim()}` : ''}\n\nPlease confirm availability and pricing. Thank you!`;
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
