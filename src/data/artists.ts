export interface Artist {
  id: string;
  slug: string;
  name: string;
  category: 'Master' | 'Contemporary' | 'Emerging';
  signatureStyle: string;
  origin: string;
  bornYear: number;
  diedYear?: number;
  bio: string;
  statement: string;
  education: string[];
  soloShowsCount: number;
  groupShowsCount: number;
  awards: string[];
  image: string;
  featured?: boolean;
}

export const artistsData: Artist[] = [
  {
    id: 'amit-bhar',
    slug: 'amit-bhar',
    name: 'Amit Bhar',
    category: 'Contemporary',
    signatureStyle: 'Spiritual Realism & Banaras Ghats',
    origin: 'Kolkata, West Bengal',
    bornYear: 1973,
    bio: 'Amit Bhar is renowned for his poetic, semi-realistic portrayals of sacred Indian riverbanks, meditating monks, and rural Bengal mysticism. His work seamlessly marries classical European chiaroscuro with Indian spiritual philosophy.',
    statement: 'Art for me is a silent contemplation of time and transcendence, capturing the timeless silence behind temple bells and the sacred river Ganges.',
    education: ['Government College of Art & Craft, Kolkata'],
    soloShowsCount: 14,
    groupShowsCount: 42,
    awards: ['National Academy Award of Excellence 2004', 'West Bengal State Fine Arts Gold Medal'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    id: 'paramesh-paul',
    slug: 'paramesh-paul',
    name: 'Paramesh Paul',
    category: 'Contemporary',
    signatureStyle: 'Sacred Temples & Varanasi Ghats',
    origin: 'Nadia, West Bengal',
    bornYear: 1970,
    bio: 'Paramesh Paul is one of India’s most celebrated contemporary painters of divine architectural heritage. His vibrant depictions of Haridwar and Varanasi bathed in dusk and dawn light have won prestigious collectors worldwide.',
    statement: 'The ancient stone steps of Kashi narrate centuries of devotion. My brush seeks to translate that primordial energy onto canvas.',
    education: ['Indian College of Arts and Draftsmanship, Kolkata'],
    soloShowsCount: 18,
    groupShowsCount: 50,
    awards: ['Camlin Art Foundation Western Region Award', 'Bombay Art Society Merit Award'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    id: 'jagannath-paul',
    slug: 'jagannath-paul',
    name: 'Jagannath Paul',
    category: 'Contemporary',
    signatureStyle: 'Dual Faces in Charcoal & Bold Acrylics',
    origin: 'Raghunathpur, West Bengal',
    bornYear: 1976,
    bio: 'Jagannath Paul is widely recognized for his captivating dual faces exploring the complex duality of human relationships, desire, and soul connections, rendered through contrasting charcoal shadows and vivid bursts of acrylic color.',
    statement: 'Every individual carries two inner worlds—one visible to society, and another whispering in the dark. My work harmonizes both.',
    education: ['Government College of Arts & Crafts, Kolkata (1st Class Honors)'],
    soloShowsCount: 22,
    groupShowsCount: 65,
    awards: ['Hindustan Pencil Ltd Award', 'Camlin Art Foundation National Award'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    id: 'anand-panchal',
    slug: 'anand-panchal',
    name: 'Anand Panchal',
    category: 'Contemporary',
    signatureStyle: 'Rural Innocence & Nostalgic Figuratives',
    origin: 'Latur, Maharashtra',
    bornYear: 1973,
    bio: 'Anand Panchal’s canvases evoke the tender simplicity of rural Indian childhood, spiritual purity, and timeless village folklore through warm earth tones, indigo pigments, and evocative elongated postures.',
    statement: 'In the laughter of rural children and the quiet gaze of heifers lies the untainted spirit of our soil.',
    education: ['Sir J.J. School of Art, Mumbai', 'G.D. Art Painting with First Rank'],
    soloShowsCount: 16,
    groupShowsCount: 38,
    awards: ['Maharashtra State Art Exhibition Fellowship', 'Sir J.J. Art Society Trophy'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    id: 'thota-vaikuntam',
    slug: 'thota-vaikuntam',
    name: 'Thota Vaikuntam',
    category: 'Master',
    signatureStyle: 'Telangana Folk Forms & Saffron Tones',
    origin: 'Burugupalli, Telangana',
    bornYear: 1942,
    bio: 'A legendary master of modern Indian art, Thota Vaikuntam is celebrated for his vibrant depictions of the proud, resilient men and women of Telangana, adorned with crimson kumkum, heavy gold ornaments, and richly draped saris.',
    statement: 'I love women from my village. They are strong, earthy, sensuous, and filled with unbroken dignity.',
    education: ['College of Fine Arts and Architecture, Hyderabad', 'Faculty of Fine Arts, M.S. University, Baroda under K.G. Subramanyan'],
    soloShowsCount: 35,
    groupShowsCount: 120,
    awards: ['National Award from Government of India', 'Bharat Bhavan Biennale Award'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    id: 'sh-raza',
    slug: 'sh-raza',
    name: 'Sayed Haider Raza',
    category: 'Master',
    signatureStyle: 'Geometric Tantric Abstraction & The Bindu',
    origin: 'Madhya Pradesh, India',
    bornYear: 1922,
    diedYear: 2016,
    bio: 'A founding member of the historic Bombay Progressive Artists’ Group, S.H. Raza revolutionized global modernist abstraction by harmonizing French Parisian formalism with ancient Indian metaphysical concepts of the Bindu, Kundalini, and Panchatatva.',
    statement: 'The Bindu is the point of origin, the black dot containing all possibilities of space, sound, time, and cosmic consciousness.',
    education: ['Nagpur School of Art', 'Sir J.J. School of Art, Mumbai', 'École Nationale Supérieure des Beaux-Arts, Paris'],
    soloShowsCount: 70,
    groupShowsCount: 250,
    awards: ['Padma Vibhushan 2013', 'Padma Bhushan 2007', 'Commandeur de la Légion d’Honneur (France)'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    id: 'prakash-deshmukh',
    slug: 'prakash-deshmukh',
    name: 'Prakash Deshmukh',
    category: 'Contemporary',
    signatureStyle: 'Lyrical Romanticism & Melodic Flutes',
    origin: 'Solapur, Maharashtra',
    bornYear: 1978,
    bio: 'Prakash Deshmukh captures ethereal moments of serenity, romance, and spiritual communion. His iconic figures often hold flutes or birds, surrounded by intricate decorative textures and lush lotus leaves.',
    statement: 'Music and love are the only truths that soothe the modern restless mind.',
    education: ['Dr. Babasaheb Ambedkar Marathwada University'],
    soloShowsCount: 12,
    groupShowsCount: 34,
    awards: ['South Central Zone Cultural Centre Award', 'Maharashtra Rajya Puraskar'],
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    featured: false
  },
  {
    id: 'arpan-bhowmik',
    slug: 'arpan-bhowmik',
    name: 'Arpan Bhowmik',
    category: 'Contemporary',
    signatureStyle: 'Monochrome Cityscapes & Crimson Tram Accents',
    origin: 'Kolkata, West Bengal',
    bornYear: 1980,
    bio: 'Arpan Bhowmik is known for his atmospheric cityscapes of Mumbai and Kolkata. Rendered primarily in rich charcoal and black acrylic washes, a single pop of crimson—a vintage taxi, umbrella, or tram—breathes kinetic life into the rainy streets.',
    statement: 'A city after rain is a mirror to millions of untold stories.',
    education: ['Indian College of Arts & Draftsmanship, Kolkata'],
    soloShowsCount: 11,
    groupShowsCount: 29,
    awards: ['Atul Bose Memorial Award', 'Governor’s Gold Medal Kolkata'],
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    featured: false
  },
  {
    id: 'seema-kohli',
    slug: 'seema-kohli',
    name: 'Seema Kohli',
    category: 'Contemporary',
    signatureStyle: 'Sacred Feminine & 24K Gold Leaf Details',
    origin: 'Delhi, India',
    bornYear: 1960,
    bio: 'Seema Kohli celebrates the golden cosmic womb (Hiranyagarbha), yoginis, and the eternal rejuvenation of nature with 24k gold leaf and intricate mythological iconography on canvas and bronze sculptures.',
    statement: 'My art is a hymn to Shakti—the infinite creative pulsation that breathes life through stars and trees.',
    education: ['Miranda House, Delhi University', 'South Delhi Polytechnic'],
    soloShowsCount: 28,
    groupShowsCount: 85,
    awards: ['Lalit Kala Akademi National Award', 'Women Achievers in Art Award'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    id: 'ramesh-gorjala',
    slug: 'ramesh-gorjala',
    name: 'Ramesh Gorjala',
    category: 'Contemporary',
    signatureStyle: 'Kalamkari Infused Mythological Figures',
    origin: 'Srikalahasti, Andhra Pradesh',
    bornYear: 1979,
    bio: 'Coming from a family of traditional Kalamkari artisans, Ramesh Gorjala reimagines divine deities like Vishnu, Krishna, and Kamadhenu, embedding hundreds of miniature mythological narratives inside the larger silhouette.',
    statement: 'Every deity is woven from thousands of folk prayers whispered over centuries.',
    education: ['J.N.T.U. School of Planning and Architecture, Hyderabad'],
    soloShowsCount: 15,
    groupShowsCount: 45,
    awards: ['State Award from Govt of Andhra Pradesh', 'Mahatma Gandhi Silver Medal'],
    image: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=600&q=80',
    featured: false
  }
];
