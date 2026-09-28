import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { ArrowUpRight, MapPin, Clock, Phone, Navigation, Plus, Minus } from 'lucide-react';
import { WhatsAppIcon } from '../components/Icons';
import { salon, whatsappUrl } from '../data/salon';
import { useSectionMotion } from '../utils/animation';
import { SectionHeading } from '../components/SectionHeading';
const faqs = [
  {
    q: 'How do I book an appointment?',
    a: 'Choose “Book an appointment”, share your preferred service, date and time, then send your enquiry on WhatsApp. We’ll reply to confirm availability and pricing. Your request is not a confirmed booking until you hear from us.',
  },
  {
    q: 'Can I bring the whole family?',
    a: 'Of course. We welcome men, women and children. Select “For the family” when booking, and let us know how many people are coming and which services you have in mind.',
  },
  {
    q: 'How much will my service cost?',
    a: 'The price depends on the service, your hair length and your treatment needs. Ask us on WhatsApp or discuss it at your consultation so you know the price before we begin.',
  },
  {
    q: 'What if I need to change my appointment?',
    a: 'Message us on WhatsApp as soon as your plans change. Share your name and appointment details, and we’ll help find another suitable time.',
  },
];
export function Contact({ onBook }: { onBook: () => void }) {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  useSectionMotion(root);
  return (
    <section className="contact section-shell section-space" id="contact" ref={root}>
      <SectionHeading label="A little closer to feeling good" title="We’re in your neighbourhood.">
        <p>
          Pop by. Say hello.
          <br />
          Make yourself at home.
        </p>
      </SectionHeading>
      <div className="contact-grid">
        <div className="contact-details" data-reveal>
          <div className="contact-line">
            <MapPin />
            <div>
              <h3>Find your way to us</h3>
              <address>{salon.address}</address>
              <a className="text-link" href={salon.maps} target="_blank" rel="noopener noreferrer">
                Get directions <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="contact-line">
            <Clock />
            <div>
              <h3>A good time to visit</h3>
              <p>{salon.hours}</p>
              <small>Holiday hours may vary. Please check before visiting.</small>
            </div>
          </div>
          <div className="contact-line">
            <Phone />
            <div>
              <h3>Let’s talk</h3>
              <a className="phone-link" href={`tel:+${salon.whatsapp}`}>
                {salon.phone}
              </a>
              <a
                className="text-link"
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={16} /> Start a WhatsApp chat
              </a>
            </div>
          </div>
        </div>
        <div className="map-card">
          <div className="map-preview">
            <svg viewBox="0 0 550 420" aria-hidden="true">
              <rect width="550" height="420" fill="#e8e2e7" />
              <g fill="#d6cfda">
                <rect x="12" y="15" width="132" height="96" rx="10" />
                <rect x="177" y="15" width="150" height="130" rx="10" />
                <rect x="365" y="12" width="169" height="99" rx="10" />
                <rect x="16" y="162" width="109" height="132" rx="10" />
                <rect x="16" y="332" width="166" height="70" rx="10" />
                <rect x="370" y="184" width="164" height="95" rx="10" />
                <rect x="373" y="320" width="160" height="86" rx="10" />
                <rect x="204" y="306" width="130" height="100" rx="10" />
              </g>
              <path
                d="M-10 132L154 132 168 236 559 152M346-10L344 428M-10 310L200 280 216 198 194 146"
                fill="none"
                stroke="#faf8f6"
                strokeWidth="18"
              />
            </svg>
            <div className="map-pin">
              <MapPin size={25} fill="currentColor" />
              <span>We’re right here.</span>
            </div>
            <div className="map-preview-footer">
              <span>Andheri East, Mumbai</span>
              <Button
                variant="contained"
                size="small"
                component="a"
                href={salon.maps}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<Navigation size={15} />}
              >
                Open Google Maps
              </Button>
            </div>
            <span className="map-note">Illustrated area · Open Google Maps for directions</span>
          </div>
        </div>
      </div>
      <div className="faq">
        <div>
          <span className="section-label">
            <span /> Before your visit
          </span>
          <h2>
            A few little <br />
            things to know.
          </h2>
          <button className="text-link" onClick={onBook}>
            Still have a question? Let’s chat <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div className={`faq-item ${open === i ? 'open' : ''}`} key={f.q}>
              <h3>
                <button
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {f.q}
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
              </h3>
              <div id={`faq-answer-${i}`} className="faq-answer" hidden={open !== i}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
