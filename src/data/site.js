// Central place for all brand + contact info.
// Update here once and it propagates across the whole site.

export const site = {
  name: 'Teez Lounge',
  tagline: 'Bar & Restaurant',
  slogan: 'Great Food · Great Vibes · Great Experience',
  location: 'Kwabenya, Accra — Ghana',
  shortAbout:
    'A premium Ghanaian dining destination where authentic flavours meet a luxury lounge atmosphere.',

  // Contact details (from the brand assets)
  phone: '059 896 0027',
  phoneRaw: '+233598960027',
  whatsapp: '059 653 6224',
  whatsappRaw: '233596536224',
  instagram: '@teez.lounge',
  instagramUrl: 'https://instagram.com/teez.lounge',
  email: 'hello@teezlounge.com',

  // A pre-filled WhatsApp message for the order/contact buttons
  whatsappMessage:
    "Hello Teez Lounge! 👋 I'd love to place an order. Could you share availability?",

  hours: [
    { day: 'Monday – Thursday', time: '11:00 AM – 11:00 PM' },
    { day: 'Friday – Saturday', time: '11:00 AM – 1:00 AM' },
    { day: 'Sunday', time: '12:00 PM – 11:00 PM' },
  ],
}

// Helper builders for action links
export const links = {
  call: `tel:${site.phoneRaw}`,
  whatsapp: `https://wa.me/${site.whatsappRaw}?text=${encodeURIComponent(
    site.whatsappMessage
  )}`,
  instagram: site.instagramUrl,
}
