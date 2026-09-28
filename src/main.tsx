import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './theme/fonts.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import { theme } from './theme/theme';
import App from './App';
import { salon } from './data/salon';
import './styles.css';
import './motion.css';
const business = {
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: salon.name,
  telephone: `+${salon.whatsapp}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      'Shop 3B, Bldg B1, Sahyog Co. Op. Housing Society, MIDC Central Road, near Kanakia Wall Street',
    addressLocality: 'Andheri East, Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400093',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 19.1157262, longitude: 72.8625185 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '21:30',
    },
  ],
  sameAs: [salon.google],
  hasMap: salon.maps,
};
const schema = document.createElement('script');
schema.type = 'application/ld+json';
schema.textContent = JSON.stringify(business);
document.head.appendChild(schema);
if (import.meta.env.VITE_SITE_URL) {
  try {
    const url = new URL(import.meta.env.VITE_SITE_URL);
    if (url.protocol === 'https:' || url.protocol === 'http:') {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = url.origin;
      document.head.appendChild(link);
    }
  } catch {
    /* An invalid optional canonical URL does not prevent rendering. */
  }
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
