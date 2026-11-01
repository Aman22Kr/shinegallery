export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Collecting Guide' | 'Artist Spotlight' | 'Conservation & Framing' | 'Market Trends';
  author: string;
  authorRole: string;
  publishDate: string;
  readTimeMinutes: number;
  image: string;
  content: string[];
  tags: string[];
}

export const blogPostsData: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'how-to-start-collecting-indian-contemporary-art',
    title: 'How to Start Collecting Indian Contemporary Art: A Curator’s Guide',
    excerpt: 'Building an art collection is both an emotional journey and a tangible legacy. Discover practical insights for selecting original works that resonate with your personal aesthetic and appreciate over time.',
    category: 'Collecting Guide',
    author: 'Aditi Gala',
    authorRole: 'Head Curator, Shine Gallery',
    publishDate: 'October 18, 2026',
    readTimeMinutes: 6,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    tags: ['Art Collecting', 'First-Time Buyers', 'Modern Art', 'Curation'],
    content: [
      'Art is one of the few possessions that matures with you. It transforms the energy of a living room, sparks contemplative conversations, and preserves a slice of cultural heritage. For many first-time collectors, stepping into the fine art world can feel intimidating—navigating galleries, understanding pricing, and deciphering mediums.',
      'At Shine Gallery, we believe art must speak to your heart before it enters your portfolio. When viewing an artwork, ask yourself: Does this composition evoke a memory, an emotion, or a sense of stillness? If an artwork lingers in your thoughts hours after you have looked away, it belongs in your home.',
      'Begin by diversifying between established mid-career masters and promising contemporary talents. Mid-career artists like Amit Bhar, Paramesh Paul, and Jagannath Paul offer a proven institutional track record with high emotional resonance, while emerging artists offer accessible entry price points.',
      'Always insist on verified provenance and a physical Certificate of Authenticity. At Shine Gallery, every original painting and limited edition serigraph is authenticated with an archival registration hologram, ensuring complete peace of mind for collectors across generations.'
    ]
  },
  {
    id: 'blog-002',
    slug: 'the-spiritual-geometries-of-sh-raza-bindu',
    title: 'The Spiritual Geometries of S.H. Raza: Decoding the Cosmic Bindu',
    excerpt: 'Explore how Sayed Haider Raza brought ancient Upanishadic concepts of the cosmic point of origin into the forefront of twentieth-century global modernist abstraction.',
    category: 'Artist Spotlight',
    author: 'Dr. Vikramaditya Sen',
    authorRole: 'Art Historian & Guest Scholar',
    publishDate: 'September 24, 2026',
    readTimeMinutes: 8,
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1000&q=80',
    tags: ['S.H. Raza', 'Modern Masters', 'Tantric Art', 'Bindu'],
    content: [
      'In the pantheon of Indian modernism, Sayed Haider Raza occupies a sacred position. In the late 1970s, after decades of painting lyrical French landscapes, Raza experienced a deep spiritual longing for his Indian roots. He recalled a childhood lesson in his native Madhya Pradesh, where his schoolteacher drew a black dot on the wall to center his restless mind.',
      'That single dot—the Bindu—became the epicenter of Raza’s revolutionary oeuvre. In Indian philosophy, the Bindu is the seed of creation (Bijamantra), the point of condensation where sound, space, time, and matter converge before exploding into manifestation.',
      'Raza utilized primary colors—black, red, yellow, and blue—to symbolize the Panchatatva, the five elemental building blocks of nature. Today, works by Raza grace the world’s most prestigious museums and international auction houses, commanding revered status among connoisseurs of global abstraction.'
    ]
  },
  {
    id: 'blog-003',
    slug: 'preserving-oil-and-acrylic-paintings-in-humid-climates',
    title: 'Preserving Oil & Acrylic Canvases: Framing and Conservation Tips',
    excerpt: 'Protect your valuable fine art acquisitions from moisture, direct UV rays, and thermal variations with these essential conservation guidelines.',
    category: 'Conservation & Framing',
    author: 'Karan Merchant',
    authorRole: 'Master Conservator, Shine Gallery Studio',
    publishDate: 'August 30, 2026',
    readTimeMinutes: 5,
    image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=1000&q=80',
    tags: ['Framing', 'Art Care', 'Conservation', 'Living With Art'],
    content: [
      'Original artworks are living objects. Canvas fibers expand and contract with fluctuations in humidity and temperature, while pigments react to ultraviolet rays over prolonged exposure.',
      'First, never position an original oil or acrylic painting in the path of direct unfiltered sunlight. UV rays gradually bleach natural pigments. If your room receives intense natural daylight, consider installing museum-grade UV-filtering glass or repositioning the canvas to an indirect accent wall.',
      'Second, allow adequate airflow behind the frame. At Shine Gallery, our custom floating frames incorporate silicone wall bumpers that maintain an 8mm breathing gap between the canvas stretcher and the masonry wall, preventing moisture condensation during coastal monsoons.',
      'Third, dust your paintings gently using a soft, dry goat-hair brush or microfibre duster every month. Avoid household cleaning liquids, damp cloths, or chemical sprays at all costs.'
    ]
  },
  {
    id: 'blog-004',
    slug: 'understanding-limited-edition-fine-art-serigraphs',
    title: 'Why Limited Edition Serigraphs Are an Accessible Entry for Art Collectors',
    excerpt: 'Unpack the craftsmanship of silkscreen printing, edition numbering, and why authentic serigraphs signed by modern masters retain strong investment value.',
    category: 'Market Trends',
    author: 'Aditi Gala',
    authorRole: 'Head Curator, Shine Gallery',
    publishDate: 'July 14, 2026',
    readTimeMinutes: 7,
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=80',
    tags: ['Serigraphs', 'Prints', 'Investment', 'Modern Art'],
    content: [
      'A common misconception among emerging collectors is that serigraphs are mere reproductions. In reality, a fine art serigraph (silkscreen print) is an original artwork in its own right, meticulously created in close collaboration with the master artist.',
      'Each color in a serigraph requires a distinct hand-drawn stencil and separate screen pass. A complex work by Thota Vaikuntam or S.H. Raza may undergo 30 to 45 individual color passes using archival, lightfast inks on heavy cotton-rag paper.',
      'Upon completion of the strictly limited run—often between 50 to 100 prints worldwide—the screens are defaced to ensure no further copies can ever be produced. The artist inspects every print, approves the color fidelity, and pencil-signs and numbers each sheet.',
      'For collectors seeking museum-caliber artistry from blue-chip masters at an accessible price point, fine art serigraphs offer a premier pathway into serious art acquisition.'
    ]
  }
];
