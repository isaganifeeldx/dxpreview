export interface ContactPageContentData {
  banner: {
    title: string;
  };
  introduction: string;
  quickEnquiries: {
    heading: string;
    content: string;
    phone: string;
    email: string;
  };
}

/** Static contact page content used as CMS fallback. */
export const contactContent: ContactPageContentData = {
  banner: {
    title: 'Contact Us',
  },
  introduction:
    'From dream to reality, we bring your vision to life through expert craftsmanship and guidance at every stage of the journey.',
  quickEnquiries: {
    heading: 'For Quick Enquiries',
    content:
      'Have a question or need assistance fast? Reach out to us directly, our team is available from 8:30 AM to 6:00 PM to provide quick support and answers.',
    phone: '1800 333 539',
    email: 'sales@dxinteriors.ai',
  },
};
