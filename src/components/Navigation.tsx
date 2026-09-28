import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Menu, X, ArrowUpRight, MapPin } from 'lucide-react';
import { Brand } from './Brand';
import { WhatsAppIcon } from './Icons';
import { whatsappUrl } from '../data/salon';
const links = [
  ['Our story', 'about'],
  ['Services', 'services'],
  ['The experience', 'experience'],
  ['Gallery', 'gallery'],
  ['Visit us', 'contact'],
];
export function Navigation({ onBook }: { onBook: () => void }) {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 25);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <Button variant="contained" onClick={onBook} endIcon={<ArrowUpRight size={16} />}>
              Book a visit
            </Button>
            <IconButton
              className="menu-toggle"
              onClick={() => setMenu(true)}
              aria-label="Open navigation"
              aria-expanded={menu}
            >
              <Menu />
            </IconButton>
          </div>
        </div>
      </header>
      <Drawer
        anchor="right"
        open={menu}
        onClose={() => setMenu(false)}
        slotProps={{ paper: { className: 'mobile-menu' } }}
      >
        <div className="menu-heading">
          <Brand />
          <IconButton onClick={() => setMenu(false)} aria-label="Close navigation">
            <X />
          </IconButton>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
              {label}
              <ArrowUpRight size={24} />
            </a>
          ))}
        </nav>
        <div className="menu-bottom">
          <p>
            <MapPin size={16} /> Andheri East, Mumbai
          </p>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              setMenu(false);
              onBook();
            }}
          >
            Book an appointment
          </Button>
          <Button
            fullWidth
            component="a"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<WhatsAppIcon size={18} />}
          >
            WhatsApp us
          </Button>
        </div>
      </Drawer>
    </>
  );
}
