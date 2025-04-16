
import { Restroom } from "../types";

// Mock restrooms data - in a real app this would come from an API
const mockRestrooms: Restroom[] = [
  {
    id: "1",
    name: "Central Park Public Restroom",
    description: "Clean public restroom located near the main entrance of Central Park",
    location: {
      lat: 40.7812,
      lng: -73.9665,
      address: "Central Park Main Entrance",
      city: "New York City",
      state: "NY"
    },
    amenities: ["toilet", "sink", "hand_dryer"],
    cleanliness: {
      score: 85,
      lastUpdated: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      reports: 42
    },
    accessibility: true,
    babyChanging: true,
    genderNeutral: false,
    reviews: [
      {
        id: "r1",
        userId: "u123",
        userName: "TravelLover",
        rating: 4,
        comment: "Very clean for a public restroom. Soap dispensers were full.",
        date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        cleanliness: 4
      },
      {
        id: "r2",
        userId: "u456",
        userName: "RoadTripper",
        rating: 5,
        comment: "Surprisingly well maintained. No waiting line when I visited.",
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        cleanliness: 5
      }
    ],
    businessInfo: {
      type: "public",
      partnerStatus: "none",
      openHours: "6:00 AM - 10:00 PM"
    }
  },
  {
    id: "2",
    name: "Starbucks - Times Square",
    description: "Clean facilities for customers of this popular coffee chain",
    location: {
      lat: 40.7580,
      lng: -73.9855,
      address: "1540 Broadway",
      city: "New York City",
      state: "NY"
    },
    amenities: ["toilet", "sink", "hand_dryer", "hand_soap", "paper_towels"],
    cleanliness: {
      score: 92,
      lastUpdated: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      reports: 128
    },
    accessibility: true,
    babyChanging: true,
    genderNeutral: true,
    reviews: [
      {
        id: "r3",
        userId: "u789",
        userName: "CityExplorer",
        rating: 5,
        comment: "Always clean. You need to be a customer but worth buying a coffee for access.",
        date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        cleanliness: 5
      }
    ],
    businessInfo: {
      type: "cafe",
      partnerStatus: "premium",
      openHours: "5:30 AM - 11:00 PM"
    }
  },
  {
    id: "3",
    name: "Grand Central Terminal Restrooms",
    description: "Public facilities in the historic train station",
    location: {
      lat: 40.7527,
      lng: -73.9772,
      address: "89 E 42nd St",
      city: "New York City",
      state: "NY"
    },
    amenities: ["toilet", "sink", "hand_dryer", "hand_soap"],
    cleanliness: {
      score: 78,
      lastUpdated: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
      reports: 256
    },
    accessibility: true,
    babyChanging: true,
    genderNeutral: false,
    reviews: [
      {
        id: "r4",
        userId: "u101",
        userName: "TrainCommuter",
        rating: 3,
        comment: "Clean enough but always crowded during rush hours.",
        date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        cleanliness: 3
      },
      {
        id: "r5",
        userId: "u202",
        userName: "NYCVisitor",
        rating: 4,
        comment: "Well maintained considering how busy this station is.",
        date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
        cleanliness: 4
      }
    ],
    businessInfo: {
      type: "public",
      partnerStatus: "none",
      openHours: "5:30 AM - 1:30 AM"
    }
  },
  {
    id: "4",
    name: "Hilton Midtown Hotel",
    description: "Luxurious restrooms in the hotel lobby",
    location: {
      lat: 40.7622,
      lng: -73.9779,
      address: "1335 6th Ave",
      city: "New York City",
      state: "NY"
    },
    amenities: ["toilet", "sink", "hand_dryer", "hand_soap", "lotion", "mouthwash"],
    cleanliness: {
      score: 96,
      lastUpdated: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
      reports: 68
    },
    accessibility: true,
    babyChanging: true,
    genderNeutral: true,
    reviews: [
      {
        id: "r6",
        userId: "u303",
        userName: "LuxeTraveler",
        rating: 5,
        comment: "Immaculately clean. The lobby restrooms are accessible without being a guest.",
        date: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
        cleanliness: 5
      }
    ],
    businessInfo: {
      type: "hotel",
      partnerStatus: "premium",
      openHours: "24/7"
    }
  },
  {
    id: "5",
    name: "Bryant Park Public Restroom",
    description: "Award-winning public restroom known for cleanliness",
    location: {
      lat: 40.7536,
      lng: -73.9832,
      address: "Bryant Park",
      city: "New York City",
      state: "NY"
    },
    amenities: ["toilet", "sink", "hand_dryer", "hand_soap", "attendant"],
    cleanliness: {
      score: 90,
      lastUpdated: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      reports: 312
    },
    accessibility: true,
    babyChanging: true,
    genderNeutral: false,
    reviews: [
      {
        id: "r7",
        userId: "u404",
        userName: "ParkVisitor",
        rating: 5,
        comment: "The cleanest public restroom I've ever seen. There's even an attendant.",
        date: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
        cleanliness: 5
      },
      {
        id: "r8",
        userId: "u505",
        userName: "UrbanExplorer",
        rating: 4,
        comment: "Very nice facilities. Sometimes there's a short wait.",
        date: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
        cleanliness: 4
      }
    ],
    businessInfo: {
      type: "public",
      partnerStatus: "standard",
      openHours: "7:00 AM - 11:00 PM"
    }
  }
];

// This would be replaced with actual geolocation or user selection in a real app
export const defaultLocation = {
  lat: 40.7580,
  lng: -73.9855
};

export const getRestroomsByLocation = (lat: number, lng: number, radius: number = 5): Restroom[] => {
  // Simple distance calculation (not accounting for Earth's curvature)
  // For a real app, use proper geospatial queries
  return mockRestrooms.filter(restroom => {
    const distance = Math.sqrt(
      Math.pow(restroom.location.lat - lat, 2) + 
      Math.pow(restroom.location.lng - lng, 2)
    );
    
    // Convert rough degrees to kilometers (very approximate)
    const distanceInKm = distance * 111;
    
    return distanceInKm <= radius;
  });
};

export const getRestroomById = (id: string): Restroom | undefined => {
  return mockRestrooms.find(restroom => restroom.id === id);
};

export const getAllRestrooms = (): Restroom[] => {
  return [...mockRestrooms];
};

export const getCleanlinessTier = (score: number): 'high' | 'medium' | 'low' => {
  if (score >= 85) return 'high';
  if (score >= 70) return 'medium';
  return 'low';
};
