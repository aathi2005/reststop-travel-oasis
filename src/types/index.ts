
export interface Restroom {
  id: string;
  name: string;
  description?: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
    city?: string;
    state?: string;
  };
  amenities: string[];
  cleanliness: {
    score: number; // 0-100
    lastUpdated: string; // ISO date string
    reports: number;
  };
  accessibility: boolean;
  babyChanging: boolean;
  genderNeutral: boolean;
  reviews: Review[];
  businessInfo?: {
    type: 'gas_station' | 'cafe' | 'restaurant' | 'hotel' | 'public' | 'other';
    partnerStatus?: 'premium' | 'standard' | 'none';
    openHours?: string;
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment?: string;
  date: string; // ISO date string
  cleanliness: number; // 1-5
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}
