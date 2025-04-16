
import { Restroom } from "../types";
import { defaultLocation } from "./restrooms";

// Custom user-added restrooms for Coimbatore
const userRestrooms: Restroom[] = [
  // This array will store user-added restrooms
];

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
