
import { Restroom } from "../types";
import { defaultLocation } from "./restrooms";

// Custom user-added restrooms for Coimbatore
const userRestrooms: Restroom[] = [
  // This array will store user-added restrooms
];

// Import the fuel station dataset
const fuelStationDataset = [
  {
    "Name": "Fuel Station Vadavalli #1542",
    "Location": "Vadavalli, Coimbatore",
    "Type": "Petrol Bunk",
    "Cleanliness Rating": 4.4,
    "Accessibility": "Yes",
    "Review": "Excellent cleanliness and well-equipped with essentials.",
    "Tag": "clean"
  },
  {
    "Name": "Fuel Station Podanur #1543",
    "Location": "Podanur, Coimbatore",
    "Type": "Petrol Bunk",
    "Cleanliness Rating": 4.1,
    "Accessibility": "Yes",
    "Review": "Hygienic environment, spotless and comfortable.",
    "Tag": "clean"
  },
  {
    "Name": "Fuel Station Saibaba Colony #1544",
    "Location": "Saibaba Colony, Coimbatore",
    "Type": "Petrol Bunk",
    "Cleanliness Rating": 2.2,
    "Accessibility": "Yes",
    "Review": "Unhygienic and poorly maintained.",
    "Tag": "dirty"
  },
  {
    "Name": "Fuel Station Saravanampatti #1545",
    "Location": "Saravanampatti, Coimbatore",
    "Type": "Petrol Bunk",
    "Cleanliness Rating": 2.5,
    "Accessibility": "Yes",
    "Review": "Average cleanliness, can be improved.",
    "Tag": "moderate"
  },
  {
    "Name": "Fuel Station Ganapathy #1546",
    "Location": "Ganapathy, Coimbatore",
    "Type": "Petrol Bunk",
    "Cleanliness Rating": 4.7,
    "Accessibility": "Yes",
    "Review": "Hygienic environment, spotless and comfortable.",
    "Tag": "clean"
  },
  {
    "Name": "Fuel Station Thudiyalur #1547",
    "Location": "Thudiyalur, Coimbatore",
    "Type": "Petrol Bunk",
    "Cleanliness Rating": 3.1,
    "Accessibility": "Yes",
    "Review": "Not very bad, but could be more hygienic.",
    "Tag": "moderate"
  },
  {
    "Name": "Fuel Station Sulur #1548",
    "Location": "Sulur, Coimbatore",
    "Type": "Petrol Bunk",
    "Cleanliness Rating": 3.7,
    "Accessibility": "Yes",
    "Review": "Excellent cleanliness and well-equipped with essentials.",
    "Tag": "clean"
  }
];

// Function to convert the fuel station dataset to Restroom format
const convertDatasetToRestrooms = (): Restroom[] => {
  return fuelStationDataset.map((station, index) => {
    // Generate a random location near Coimbatore's center for demonstration
    // In a real app, you'd use geocoding to get exact coordinates
    const randomLat = defaultLocation.lat + (Math.random() - 0.5) * 0.1;
    const randomLng = defaultLocation.lng + (Math.random() - 0.5) * 0.1;
    
    // Extract location parts
    const locationParts = station.Location.split(', ');
    const area = locationParts[0] || '';
    
    // Convert cleanliness rating from 5-point scale to 100-point scale
    const cleanlinessScore = Math.round(station["Cleanliness Rating"] * 20);
    
    // Determine amenities based on tag
    const amenities = ["toilet", "sink"];
    if (station.Tag === "clean") {
      amenities.push("hand_soap", "paper_towels");
    }
    
    return {
      id: `fuel-${index + 1}`,
      name: station.Name,
      description: `${station.Type} restroom in ${area}`,
      location: {
        lat: randomLat,
        lng: randomLng,
        address: station.Location,
        city: "Coimbatore",
        state: "Tamil Nadu"
      },
      amenities: amenities,
      cleanliness: {
        score: cleanlinessScore,
        lastUpdated: new Date().toISOString(),
        reports: Math.floor(Math.random() * 50) + 10  // Random number of reports between 10-60
      },
      accessibility: station.Accessibility === "Yes",
      babyChanging: Math.random() > 0.5, // Randomly assign baby changing facilities
      genderNeutral: Math.random() > 0.7, // Randomly assign gender neutral status
      reviews: [
        {
          id: `review-fuel-${index + 1}`,
          userId: `user-${Math.floor(Math.random() * 1000)}`,
          userName: "Dataset User",
          rating: Math.round(station["Cleanliness Rating"]),
          comment: station.Review,
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
          cleanliness: Math.round(station["Cleanliness Rating"])
        }
      ],
      businessInfo: {
        type: "gas_station",
        partnerStatus: station.Tag === "clean" ? "premium" : "standard",
        openHours: "24/7"
      }
    };
  });
};

// Initialize the user restrooms with the converted dataset
const datasetRestrooms = convertDatasetToRestrooms();
userRestrooms.push(...datasetRestrooms);

// Function to add a new restroom to the dataset
export const addRestroom = (restroom: Restroom): Restroom[] => {
  // Create a new restroom with generated ID if not provided
  const newRestroom = {
    ...restroom,
    id: restroom.id || `user-${Date.now()}`,
  };
  
  // Add to user restrooms
  userRestrooms.push(newRestroom);
  
  // Return updated list
  return [...userRestrooms];
};

// Get all user-added restrooms
export const getUserRestrooms = (): Restroom[] => {
  return [...userRestrooms];
};

// Function to get recommendations based on user preferences
export const getRecommendedRestrooms = (
  allRestrooms: Restroom[], 
  preferences: { 
    accessibility?: boolean;
    babyChanging?: boolean;
    genderNeutral?: boolean;
    minCleanliness?: number;
  }
): Restroom[] => {
  // Filter restrooms based on user preferences
  let recommended = allRestrooms.filter(restroom => {
    // If accessibility is important and restroom is not accessible, exclude
    if (preferences.accessibility && !restroom.accessibility) return false;
    
    // If baby changing is important and restroom doesn't have it, exclude
    if (preferences.babyChanging && !restroom.babyChanging) return false;
    
    // If gender neutral is important and restroom is not gender neutral, exclude
    if (preferences.genderNeutral && !restroom.genderNeutral) return false;
    
    // If minimum cleanliness score is set and restroom scores below it, exclude
    if (preferences.minCleanliness && restroom.cleanliness.score < preferences.minCleanliness) return false;
    
    // Include this restroom in recommendations
    return true;
  });
  
  // Sort by cleanliness score
  recommended.sort((a, b) => b.cleanliness.score - a.cleanliness.score);
  
  // Return top recommendations (limit to 5)
  return recommended.slice(0, 5);
};
