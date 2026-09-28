import { useEffect, useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';
import { X, ArrowRight, ArrowLeft, CalendarHeart, Check } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { services, whatsappUrl } from '../data/salon';
import { bookingErrors, bookingMessage, salonDate } from '../utils/booking';
import type { BookingDetails } from '../utils/booking';
const additional = ['For women', 'For men', 'For the family', 'Help choosing a service'];
export default function BookingDialog({
  initialService,
  onClose,
}: {
  initialService: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState<BookingDetails>({
    name: '',
    service: initialService,
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [review, setReview] = useState(false);
  const [continued, setContinued] = useState(false);
  const mobile = useMediaQuery('(max-width:600px)');
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (review) heading.current?.focus();
  }, [review]);
  const update = (key: keyof BookingDetails, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };
  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={mobile}
      aria-labelledby="booking-title"
      className="booking-dialog"
    >
      <div className="booking-header">
        <span>
          <CalendarHeart size={19} /> A little time for you
        </span>
        <IconButton onClick={onClose} aria-label="Close booking">
          <X />
        </IconButton>
      </div>
      <DialogContent>
        <h2 id="booking-title" ref={heading} tabIndex={-1}>
          {review ? 'Your next feel-good moment.' : 'Let’s plan your visit.'}
        </h2>
        <p className="booking-intro">
          {review
            ? 'Check your preferences, then send your enquiry on WhatsApp.'
            : 'Tell us what you have in mind. We’ll confirm the details with you on WhatsApp.'}
        </p>
        {review ? (
          <div className="booking-review">
            <dl>
              <div>
                <dt>Name</dt>
                <dd>{form.name}</dd>
              </div>
              <div>
                <dt>Service</dt>
                <dd>{form.service}</dd>
              </div>
              <div>
                <dt>Preferred visit</dt>
                <dd>
                  {new Date(`${form.date}T12:00:00`).toLocaleDateString('en-IN', {
                    dateStyle: 'long',
                  })}
                  <br />
                  {form.time}
                </dd>
              </div>
              {form.notes ? (
                <div>
                  <dt>Your notes</dt>
                  <dd>{form.notes}</dd>
                </div>
              ) : null}
            </dl>
            <Alert severity="info" icon={<CalendarHeart size={20} />}>
              This is an enquiry. Your appointment is confirmed only when the salon replies.
            </Alert>
            {continued ? (
              <Alert severity="success" icon={<Check size={20} />}>
                WhatsApp has been opened. Send your message there to complete your enquiry.
              </Alert>
            ) : null}
            <Button
              fullWidth
              variant="contained"
              component="a"
              href={whatsappUrl(bookingMessage(form))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setContinued(true)}
              startIcon={<WhatsAppIcon size={19} />}
            >
              Continue to WhatsApp
            </Button>
            <Button
              onClick={() => {
                setReview(false);
                setContinued(false);
              }}
              startIcon={<ArrowLeft size={16} />}
            >
              Edit preferences
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const found = bookingErrors(form);
              setErrors(found);
              if (Object.keys(found).length === 0) setReview(true);
              else {
                const first = e.currentTarget.querySelector<HTMLInputElement | HTMLSelectElement>(
                  `[name="${Object.keys(found)[0]}"]`,
                );
                first?.focus();
              }
            }}
            noValidate
          >
            <div className="booking-fields">
              <TextField
                name="name"
                label="Your name"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
                autoComplete="name"
                slotProps={{ htmlInput: { maxLength: 80 } }}
              />
              <TextField
                name="service"
                select
                label="Your service"
                value={form.service}
                onChange={(e) => update('service', e.target.value)}
                error={!!errors.service}
                helperText={errors.service}
                required
                slotProps={{ select: { native: true }, inputLabel: { shrink: true } }}
              >
                <option value="">Choose a service</option>
                {[...services.map((s) => s.name), ...additional].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </TextField>
              <div className="booking-row">
                <TextField
                  name="date"
                  type="date"
                  label="Preferred date"
                  value={form.date}
                  onChange={(e) => update('date', e.target.value)}
                  error={!!errors.date}
                  helperText={errors.date}
                  required
                  slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: salonDate() } }}
                />
                <TextField
                  name="time"
                  select
                  label="Preferred time"
                  value={form.time}
                  onChange={(e) => update('time', e.target.value)}
                  error={!!errors.time}
                  helperText={errors.time}
                  required
                  slotProps={{ select: { native: true }, inputLabel: { shrink: true } }}
                >
                  <option value="">Choose a time</option>
                  <option>Morning (10 am – 12 pm)</option>
                  <option>Afternoon (12 pm – 4 pm)</option>
                  <option>Evening (4 pm – 7 pm)</option>
                  <option>Late evening (7 pm – 9 pm)</option>
                </TextField>
              </div>
              <TextField
                label="Anything else? (optional)"
                multiline
                rows={2}
                placeholder="A family visit, a style you love, or something we should know…"
                value={form.notes}
                onChange={(e) => update('notes', e.target.value)}
                slotProps={{ htmlInput: { maxLength: 500 } }}
              />
            </div>
            <p className="booking-privacy">
              Your details stay on this device until you choose to open WhatsApp. No payment is
              taken. Timing and pricing are confirmed by the salon.
            </p>
            <Button fullWidth type="submit" variant="contained" endIcon={<ArrowRight size={18} />}>
              Review your enquiry
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
