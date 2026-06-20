import { Perfume } from '../types';

export const DEFAULT_ACCORD_COLORS: Record<string, string> = {
  "Woody": "#8d6e63",
  "Spicy": "#d84315",
  "Amber": "#ff8f00",
  "Citrus": "#fbc02d",
  "Floral": "#ec407a",
  "Powdery": "#ce93d8",
  "Sweet": "#f06292",
  "Aquatic": "#29b6f6",
  "Leather": "#5d4037",
  "Chocolate": "#4e342e",
  "Musk": "#b0bec5",
  "Aldehydic": "#f59e0b",
  "Fresh": "#26c6da",
  "Fruity": "#ff5252",
  "Aromatic": "#009688",
  "Fresh Spicy": "#00acc1",
  "Animalic": "#4e4d4a",
  "Herbal": "#43a047"
};

export const INITIAL_PERFUMES: Perfume[] = [
  {
    id: "1",
    name: "Oud Wood Intense",
    code: "P-OW19",
    brand: "Tom Ford",
    price: 9500,
    gender: "Male",
    category: "Brand Perfume",
    description: "An incredibly luxurious and intense blend of rare oud wood, smoky cardamom, Sichuan pepper, and warm amber resin.",
    rating: 4.8,
    mainImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600",
    galleryImages: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600"],
    accords: [
      { name: "Woody", value: 90, color: "#8d6e63" },
      { name: "Spicy", value: 75, color: "#d84315" },
      { name: "Leather", value: 60, color: "#5d4037" }
    ],
    fragranceProfile: {
      longevity: "10H",
      projection: "Strong",
      sillage: "Heavy"
    },
    dayNight: "Night",
    seasons: ["Winter", "Autumn"],
    notes: {
      top: [
        { name: "Sichuan Pepper", iconUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop" },
        { name: "Cardamom", iconUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop" }
      ],
      middle: [
        { name: "Oud Wood", iconUrl: "https://images.unsplash.com/photo-1517457210515-46e3fb0b35cd?w=100&h=100&fit=crop" },
        { name: "Sandalwood", iconUrl: "https://images.unsplash.com/photo-1626015502690-e555909247eb?w=100&h=100&fit=crop" }
      ],
      base: [
        { name: "Vanilla", iconUrl: "https://images.unsplash.com/photo-1615655513076-2e4b31a3962b?w=100&h=100&fit=crop" },
        { name: "Amber Resin", iconUrl: "https://images.unsplash.com/photo-1616081498175-680459c3a3b0?w=100&h=100&fit=crop" }
      ]
    }
  },
  {
    id: "2",
    name: "Baccarat Rouge 540",
    code: "P-BR54",
    brand: "Maison Francis Kurkdjian",
    price: 13500,
    gender: "Unisex",
    category: "Luxury Perfume",
    description: "Luminous and highly sophisticated, Baccarat Rouge 540 lies on the skin like a warm, sweet, poetic amber-floral breeze.",
    rating: 4.9,
    mainImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600",
    galleryImages: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=600"],
    accords: [
      { name: "Amber", value: 95, color: "#ff8f00" },
      { name: "Sweet", value: 85, color: "#f06292" },
      { name: "Woody", value: 70, color: "#8d6e63" }
    ],
    fragranceProfile: {
      longevity: "12H+",
      projection: "Enormous",
      sillage: "Enormous"
    },
    dayNight: "Both",
    seasons: ["Winter", "Spring", "Autumn"],
    notes: {
      top: [
        { name: "Saffron", iconUrl: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=100&h=100&fit=crop" },
        { name: "Jasmine", iconUrl: "https://images.unsplash.com/photo-1558223635-a6a9be78efaa?w=100&h=100&fit=crop" }
      ],
      middle: [
        { name: "Amberwood", iconUrl: "https://images.unsplash.com/photo-1517457210515-46e3fb0b35cd?w=100&h=100&fit=crop" },
        { name: "Ambergris", iconUrl: "https://images.unsplash.com/photo-1626015502690-e555909247eb?w=100&h=100&fit=crop" }
      ],
      base: [
        { name: "Fir Resin", iconUrl: "https://images.unsplash.com/photo-1615655513076-2e4b31a3962b?w=100&h=100&fit=crop" },
        { name: "Cedarwood", iconUrl: "https://images.unsplash.com/photo-1550605995-1c390543f324?w=100&h=100&fit=crop" }
      ]
    }
  },
  {
    id: "3",
    name: "Bleu de Chanel",
    code: "P-BC40",
    brand: "Chanel",
    price: 8900,
    gender: "Male",
    category: "Brand Perfume",
    description: "A deeply captivating woody-aromatic masterpiece designed with sharp, invigorating grapefruit and lemon over heavy incense.",
    rating: 4.7,
    mainImage: "https://images.unsplash.com/photo-1523293111624-9b2f2d9dc2ba?w=600",
    galleryImages: ["https://images.unsplash.com/photo-1523293111624-9b2f2d9dc2ba?w=600"],
    accords: [
      { name: "Citrus", value: 85, color: "#fbc02d" },
      { name: "Woody", value: 75, color: "#8d6e63" },
      { name: "Aromatic", value: 65, color: "#009688" }
    ],
    fragranceProfile: {
      longevity: "8H",
      projection: "Moderate",
      sillage: "Moderate"
    },
    dayNight: "Both",
    seasons: ["Spring", "Summer", "Autumn"],
    notes: {
      top: [
        { name: "Grapefruit", iconUrl: "https://images.unsplash.com/photo-1577234286142-fc0ee054174d?w=100&h=100&fit=crop" },
        { name: "Lemon Mint", iconUrl: "https://images.unsplash.com/photo-1590502593747-422e1180addd?w=100&h=100&fit=crop" }
      ],
      middle: [
        { name: "Ginger Root", iconUrl: "https://images.unsplash.com/photo-1596541604085-f53856a9486c?w=100&h=100&fit=crop" },
        { name: "Nutmeg Spice", iconUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop" }
      ],
      base: [
        { name: "Smoky Incense", iconUrl: "https://images.unsplash.com/photo-1533038590840-0255c27bf215?w=100&h=100&fit=crop" },
        { name: "Sandalwood", iconUrl: "https://images.unsplash.com/photo-1626015502690-e555909247eb?w=100&h=100&fit=crop" }
      ]
    }
  },
  {
    id: "4",
    name: "La Vie Est Belle",
    code: "P-LB55",
    brand: "Lancôme",
    price: 6400,
    gender: "Female",
    category: "Perfume",
    description: "An elegant, optimistic floral-gourmand fragrance weaving black currant, pear, and blooming iris with a deep dark-chocolate base.",
    rating: 4.6,
    mainImage: "https://images.unsplash.com/photo-1588405748880-12d1d4d03e54?w=600",
    galleryImages: ["https://images.unsplash.com/photo-1588405748880-12d1d4d03e54?w=600"],
    accords: [
      { name: "Sweet", value: 90, color: "#f06292" },
      { name: "Fruity", value: 80, color: "#ff5252" },
      { name: "Floral", value: 70, color: "#ec407a" }
    ],
    fragranceProfile: {
      longevity: "9H",
      projection: "Strong",
      sillage: "Heavy"
    },
    dayNight: "Day",
    seasons: ["Winter", "Autumn", "Spring"],
    notes: {
      top: [
        { name: "Ripe Pear", iconUrl: "https://images.unsplash.com/photo-1615486171448-4cbab134375b?w=100&h=100&fit=crop" },
        { name: "Black Currant", iconUrl: "https://images.unsplash.com/photo-1586523171305-645472851b68?w=100&h=100&fit=crop" }
      ],
      middle: [
        { name: "Florentine Iris", iconUrl: "https://images.unsplash.com/photo-1614705353118-c2b4c5211d27?w=100&h=100&fit=crop" },
        { name: "Jasmine Blossom", iconUrl: "https://images.unsplash.com/photo-1558223635-a6a9be78efaa?w=100&h=100&fit=crop" }
      ],
      base: [
        { name: "Praline Sugar", iconUrl: "https://images.unsplash.com/photo-1557993414-f4b66dfdfc29?w=100&h=100&fit=crop" },
        { name: "Madagascar Vanilla", iconUrl: "https://images.unsplash.com/photo-1615655513076-2e4b31a3962b?w=100&h=100&fit=crop" }
      ]
    }
  },
  {
    id: "5",
    name: "Dior Sauvage",
    code: "P-DS12",
    brand: "Dior",
    price: 8800,
    gender: "Male",
    category: "Brand Perfume",
    description: "A radically fresh and raw composition, dictating absolute values with powerful bergamot freshness and heavy amberwood.",
    rating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600",
    galleryImages: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600"],
    accords: [
      { name: "Citrus", value: 85, color: "#fbc02d" },
      { name: "Aromatic", value: 75, color: "#009688" },
      { name: "Fresh Spicy", value: 65, color: "#00acc1" }
    ],
    fragranceProfile: {
      longevity: "8H",
      projection: "Strong",
      sillage: "Moderate"
    },
    dayNight: "Day",
    seasons: ["Spring", "Summer", "Autumn"],
    notes: {
      top: [
        { name: "Calabrian Bergamot", iconUrl: "https://images.unsplash.com/photo-1577234286142-fc0ee054174d?w=100&h=100&fit=crop" },
        { name: "Szechuan Pepper", iconUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop" }
      ],
      middle: [
        { name: "French Lavender", iconUrl: "https://images.unsplash.com/photo-1558223635-a6a9be78efaa?w=100&h=100&fit=crop" },
        { name: "Star Anise", iconUrl: "https://images.unsplash.com/photo-1614705353118-c2b4c5211d27?w=100&h=100&fit=crop" }
      ],
      base: [
        { name: "Cedarwood", iconUrl: "https://images.unsplash.com/photo-1550605995-1c390543f324?w=100&h=100&fit=crop" },
        { name: "Ambergris", iconUrl: "https://images.unsplash.com/photo-1626015502690-e555909247eb?w=100&h=100&fit=crop" }
      ]
    }
  },
  {
    id: "6",
    name: "Chanel No. 5",
    code: "P-C05",
    brand: "Chanel",
    price: 12500,
    gender: "Female",
    category: "Luxury Perfume",
    description: "The very abstract, mysterious class of absolute femininity, featuring sparkling aldehydes and rose absolute over warm sandalwood.",
    rating: 4.8,
    mainImage: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600",
    galleryImages: ["https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600"],
    accords: [
      { name: "Aldehydic", value: 90, color: "#f59e0b" },
      { name: "Floral", value: 85, color: "#ec407a" },
      { name: "Powdery", value: 75, color: "#ce93d8" }
    ],
    fragranceProfile: {
      longevity: "12H+",
      projection: "Enormous",
      sillage: "Enormous"
    },
    dayNight: "Night",
    seasons: ["Winter", "Autumn"],
    notes: {
      top: [
        { name: "Aldehydes", iconUrl: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=100&h=100&fit=crop" },
        { name: "Neroli Blossom", iconUrl: "https://images.unsplash.com/photo-1577234286142-fc0ee054174d?w=100&h=100&fit=crop" }
      ],
      middle: [
        { name: "Grasse Rose", iconUrl: "https://images.unsplash.com/photo-1558223635-a6a9be78efaa?w=100&h=100&fit=crop" },
        { name: "Jasmine Absolute", iconUrl: "https://images.unsplash.com/photo-1558223635-a6a9be78efaa?w=100&h=100&fit=crop" }
      ],
      base: [
        { name: "Madagascar Vanilla", iconUrl: "https://images.unsplash.com/photo-1615655513076-2e4b31a3962b?w=100&h=100&fit=crop" },
        { name: "Mysore Sandalwood", iconUrl: "https://images.unsplash.com/photo-1616081498175-680459c3a3b0?w=100&h=100&fit=crop" }
      ]
    }
  },
  {
    id: "7",
    name: "Baby Powder Fresh",
    code: "P-BP02",
    brand: "Yeab Organics",
    price: 3200,
    gender: "Kids",
    category: "Perfume",
    description: "An exceptionally mild, soothing, and allergen-safe cologne formulation crafted for delicate skins, offering light chamomile and vanilla.",
    rating: 4.4,
    mainImage: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=650",
    galleryImages: ["https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=650"],
    accords: [
      { name: "Powdery", value: 90, color: "#ce93d8" },
      { name: "Fresh", value: 80, color: "#26c6da" },
      { name: "Sweet", value: 65, color: "#f06292" }
    ],
    fragranceProfile: {
      longevity: "4H",
      projection: "Light",
      sillage: "Soft"
    },
    dayNight: "Day",
    seasons: ["Spring", "Summer"],
    notes: {
      top: [
        { name: "Sweet Orange", iconUrl: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=150" },
        { name: "White Petals", iconUrl: "https://images.unsplash.com/photo-1558223635-a6a9be78efaa?auto=format&fit=crop&q=80&w=150" }
      ],
      middle: [
        { name: "Chamomile Tea", iconUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=150" },
        { name: "Warm Milk", iconUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=150" }
      ],
      base: [
        { name: "Musk", iconUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=150" },
        { name: "Smooth Vanilla", iconUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=150" }
      ]
    }
  },
  {
    id: "8",
    name: "Ocean Breeze",
    code: "P-OB11",
    brand: "Acqua Di Parma",
    price: 7800,
    gender: "Unisex",
    category: "Luxury Perfume",
    description: "An invigorating splash of Sicilian bergamot, fresh sea spray, lavender, and crisp white rosemary that captures the warmth of an beach escape.",
    rating: 4.6,
    mainImage: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=650",
    galleryImages: ["https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=650"],
    accords: [
      { name: "Aquatic", value: 95, color: "#29b6f6" },
      { name: "Citrus", value: 85, color: "#fbc02d" },
      { name: "Herbal", value: 70, color: "#43a047" }
    ],
    fragranceProfile: {
      longevity: "6H",
      projection: "Moderate",
      sillage: "Moderate"
    },
    dayNight: "Day",
    seasons: ["Spring", "Summer"],
    notes: {
      top: [
        { name: "Bergamot Citrus", iconUrl: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?auto=format&fit=crop&q=80&w=150" },
        { name: "Sea Salt Spray", iconUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=150" }
      ],
      middle: [
        { name: "Rosemary Sprig", iconUrl: "https://images.unsplash.com/photo-1515516969-d4014cc0c997?auto=format&fit=crop&q=80&w=150" },
        { name: "Blue Lavender", iconUrl: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=150" }
      ],
      base: [
        { name: "Driftwood", iconUrl: "https://images.unsplash.com/photo-1596541604085-f53856a9486c?auto=format&fit=crop&q=80&w=150" },
        { name: "Musk", iconUrl: "https://images.unsplash.com/photo-1558223635-a6a9be78efaa?auto=format&fit=crop&q=80&w=150" }
      ]
    }
  }
];
