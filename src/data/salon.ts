export const salon = {
  name: 'Mens&WomensFamilySalon',
  phone: '+91 62607 16380',
  whatsapp: (import.meta.env.VITE_WHATSAPP_NUMBER || '916260716380').replace(/\D/g, ''),
  google: 'https://share.google/zvJQ0sWInvbvRdooP',
  maps: 'https://www.google.com/maps?cid=16739943978379695160',
  address:
    'Shop 3B, Bldg B1, Sahyog Co. Op. Housing Society, MIDC Central Road, near Kanakia Wall Street, Mulgaon, Andheri East, Mumbai, Maharashtra 400093',
  hours: 'Every day, 10:00 am – 9:30 pm',
  rating: '5.0',
  reviewCount: 3,
};
export const defaultMessage = `Hi ${salon.name}, I'd like to enquire about your services and book an appointment.`;
export const whatsappUrl = (message = defaultMessage) =>
  `https://wa.me/${salon.whatsapp}?text=${encodeURIComponent(message)}`;
export type Category = 'All services' | 'Hair' | 'Skin & beauty' | 'Grooming';
export const services = [
  {
    name: 'Cuts & styling',
    category: 'Hair',
    image: 'hair',
    description: 'A fresh perspective. A shape that feels like you.',
    details:
      'Personalised haircuts, blow-dries and occasion styling for your length, texture and everyday routine.',
    icon: 'scissors',
  },
  {
    name: 'Colour & care',
    category: 'Hair',
    image: 'styling',
    description: 'Rich colour. Beautifully cared-for hair.',
    details:
      'Explore colour, highlights, conditioning and hair-spa options with a consultation before your treatment.',
    icon: 'sparkles',
  },
  {
    name: 'Facials & skin',
    category: 'Skin & beauty',
    image: 'facial',
    description: 'Slow down. Give your skin a little attention.',
    details:
      'Cleansing, facial massage and nourishing face packs, with treatment selection tailored to your skin.',
    icon: 'flower',
  },
  {
    name: 'Beard & grooming',
    category: 'Grooming',
    image: 'grooming',
    description: 'Considered details. A confident finish.',
    details:
      'Beard shaping, trims and finishing touches to complement your cut and personal style.',
    icon: 'scissors',
  },
  {
    name: 'Beauty rituals',
    category: 'Skin & beauty',
    image: 'beauty',
    description: 'The finishing touches that make it yours.',
    details:
      'Ask us about your beauty and occasion-prep needs. We will help plan a suitable service before you book.',
    icon: 'sparkles',
  },
  {
    name: 'Hair spa & treatments',
    category: 'Hair',
    image: 'portrait',
    description: 'A reset for your hair. A pause for you.',
    details:
      'A relaxed scalp and hair-care consultation, followed by a conditioning ritual chosen for your needs.',
    icon: 'flower',
  },
] as const;
export const gallery = [
  { image: 'portrait', title: 'Texture, with personality', tag: 'Hair inspiration' },
  { image: 'grooming', title: 'A sharper kind of everyday', tag: 'Grooming inspiration' },
  { image: 'facial', title: 'Make time to unwind', tag: 'Skin-care inspiration' },
  { image: 'styling', title: 'The art of the finishing touch', tag: 'Styling inspiration' },
  { image: 'hair', title: 'Good hair starts with care', tag: 'Hair-care inspiration' },
];
