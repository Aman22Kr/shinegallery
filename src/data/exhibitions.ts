export interface Exhibition {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  status: 'Current' | 'Upcoming' | 'Past';
  startDate: string;
  endDate: string;
  venue: string;
  curator: string;
  featuredArtistIds: string[];
  bannerImage: string;
  shortDescription: string;
  fullStatement: string;
  totalWorks: number;
  catalogueDownloadName: string;
}

export const exhibitionsData: Exhibition[] = [
  {
    id: 'exh-001',
    slug: 'symphony-of-the-ghats',
    title: 'Symphony of the Ghats: Sacred Light of Kashi',
    subtitle: 'A dual showcase of mystical riverfronts and ancient stone sanctuaries',
    status: 'Current',
    startDate: 'October 15, 2026',
    endDate: 'November 30, 2026',
    venue: 'Shine Gallery Main Pavilion, 356 Linking Road, Khar West, Mumbai',
    curator: 'Aditi Gala & Curatorial Board',
    featuredArtistIds: ['amit-bhar', 'paramesh-paul'],
    bannerImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=85',
    shortDescription: 'Witness the divine architectural glory of Varanasi and Haridwar captured in radiant oil impasto and serene acrylic glazes by Amit Bhar and Paramesh Paul.',
    fullStatement: 'Varanasi has fascinated poets, philosophers, and painters for millennia. In "Symphony of the Ghats", Shine Gallery brings together two distinct contemporary masters whose brushes translate sacred light into metaphysical emotion. From Amit Bhar’s hushed morning mists to Paramesh Paul’s dramatic textural evening aartis, this exhibition invites collectors to pause and absorb the enduring spirit of India’s spiritual capital.',
    totalWorks: 28,
    catalogueDownloadName: 'ShineGallery_SymphonyOfTheGhats_Catalogue.pdf'
  },
  {
    id: 'exh-002',
    slug: 'eternal-dualities',
    title: 'Eternal Dualities: Charcoal & Chromatics',
    subtitle: 'Solo Retrospective of Recent Works by Jagannath Paul',
    status: 'Current',
    startDate: 'November 1, 2026',
    endDate: 'December 15, 2026',
    venue: 'Shine Gallery Upper Salon & Virtual 3D Room',
    curator: 'Rohan Mehta',
    featuredArtistIds: ['jagannath-paul'],
    bannerImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=85',
    shortDescription: 'An immersive journey into the psychological landscape of human relationships, desire, and silent companionship rendered through charcoal dust and fiery acrylics.',
    fullStatement: 'Jagannath Paul’s faces are not mere portraits—they are archetypes of love, introspection, and hidden emotion. This solo retrospective presents 22 monumental and intimate works created over the past eighteen months, highlighting Paul’s boundary-pushing harmony between monochromatic charcoal and blazing pure color.',
    totalWorks: 22,
    catalogueDownloadName: 'ShineGallery_EternalDualities_Catalogue.pdf'
  },
  {
    id: 'exh-003',
    slug: 'masters-of-the-modern-epoch',
    title: 'Masters of the Modern Epoch: Souza, Raza & Husain',
    subtitle: 'Landmark Masterpieces from the Post-Independence Progressive Movement',
    status: 'Upcoming',
    startDate: 'December 20, 2026',
    endDate: 'January 25, 2027',
    venue: 'Shine Gallery Master Wing & By-Appointment VIP Lounge',
    curator: 'Dr. Vikramaditya Sen',
    featuredArtistIds: ['sh-raza', 'thota-vaikuntam'],
    bannerImage: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1400&q=85',
    shortDescription: 'A landmark gathering of rare museum-caliber works and signed archival serigraphs celebrating the radical vision of India’s progressive modern pioneers.',
    fullStatement: 'In 1947, a daring collective of young painters broke away from colonial academicism to forge a sovereign modern visual language for a newly independent India. "Masters of the Modern Epoch" honors this legacy through significant works by S.H. Raza, F.N. Souza, and M.F. Husain, offering collectors a privileged window into art history.',
    totalWorks: 19,
    catalogueDownloadName: 'ShineGallery_ModernEpoch_Brochure.pdf'
  },
  {
    id: 'exh-004',
    slug: 'contours-of-telangana',
    title: 'Contours of Telangana: Vibrant Heritage in Pigment',
    subtitle: 'Celebrating the Rustic Soul and Sensuous Vitality of Folk Life',
    status: 'Past',
    startDate: 'August 10, 2026',
    endDate: 'September 20, 2026',
    venue: 'Shine Gallery Mumbai & Online Global Viewing Room',
    curator: 'Aditi Gala',
    featuredArtistIds: ['thota-vaikuntam'],
    bannerImage: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1400&q=85',
    shortDescription: 'A landmark celebration of Thota Vaikuntam and contemporary Deccan figurative painters capturing rural pride and deep cultural roots.',
    fullStatement: 'Filled with saffron, indigo, and deep vermilion, this celebrated exhibition explored the vivid folklore and unapologetic strength of rural Telangana women and men.',
    totalWorks: 25,
    catalogueDownloadName: 'ShineGallery_Telangana_Archive.pdf'
  }
];
