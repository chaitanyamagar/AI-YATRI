
interface GeminiRequest {
    contents: {
      role: string;
      parts: {
        text: string;
      }[];
    }[];
    generationConfig: {
      temperature: number;
      topP: number;
      topK: number;
      maxOutputTokens: number;
    };
  }
  
  interface GeminiResponse {
    candidates: {
      content: {
        parts: {
          text: string;
        }[];
      };
    }[];
  }
  
  // This key would ideally be stored in an environment variable or Supabase secrets
  // For demo purposes, we're using a placeholder
  const API_KEY = "enter here your api key"; 
  
  export const generateTravelResponse = async (
    userMessage: string,
    userContext: {
      destination?: string;
      startDate?: string;
      endDate?: string;
      travelers?: number;
      budget?: number;
      transportMode?: string;
      accommodation?: string;
      interests?: string[];
    }
  ): Promise<string> => {
    try {
      // Create the prompt with user context
      const promptTemplate = `
  You are an AI travel assistant for the website "AI Yatri," specializing in trip planning, recommendations, and real-time travel assistance for Maharashtra travel. Your goal is to provide customized travel suggestions based on the user's preferences, budget, destination, and travel dates.
  
  🔸 User Information:
  - Destination: ${userContext.destination || "Unknown"}
  - Travel Dates: ${userContext.startDate || "Unknown"} to ${userContext.endDate || "Unknown"}
  - Number of Travelers: ${userContext.travelers || "Unknown"}
  - Budget: ₹${userContext.budget || "Unknown"}
  - Transportation Mode: ${userContext.transportMode || "Unknown"} 
  - Accommodation Preference: ${userContext.accommodation || "Unknown"}
  - Travel Interests: ${userContext.interests?.join(", ") || "Unknown"}
  
  🔸 Your Role:
  1️⃣ Suggest personalized itineraries based on the user's destination, travel dates, and budget.
  2️⃣ Recommend top-rated hotels, restaurants, and must-visit places.
  3️⃣ Provide estimated costs for flights, trains, and cabs.
  4️⃣ Answer user queries about travel permits, visa requirements, and local rules.
  5️⃣ Offer support by providing important travel details.
  
  User's question: ${userMessage}
  
  Please provide a detailed, helpful response focusing on Maharashtra travel with specific recommendations.
  `;
  
      const requestBody: GeminiRequest = {
        contents: [
          {
            role: "user",
            parts: [{ text: promptTemplate }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 2048
        }
      };
  //     // Check if API key is configured
  //     if (!API_KEY || API_KEY === "enter here your api key") {
  //       console.warn("Using fallback responses - no Gemini API key configured");
  //       return generateFallbackResponse(userMessage, userContext.destination);
  //     }
  //     const response = await fetch(
  //       `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify(requestBody)
  //       }
  //     );
  
  //     if (!response.ok) {
  //       throw new Error(`API request failed with status ${response.status}`);
  //     }
  
  //     const data: GeminiResponse = await response.json();
  //     return data.candidates[0].content.parts[0].text;
  //   } catch (error) {
  //     console.error("Error generating travel response:", error);
  //     return generateFallbackResponse(userMessage, userContext.destination);
  //   }
  // };
  
  // Fallback responses when API is not available
  const generateFallbackResponse = (userMessage: string, destination?: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    const dest = destination?.toLowerCase() || "";
    
    // Match user queries with relevant fallback responses
    if (lowerCaseMessage.includes("best time") || lowerCaseMessage.includes("when to visit")) {
      return `The best time to visit Maharashtra is between October and March when the weather is pleasant. Avoid the monsoon season (June-September) if you're planning outdoor activities.`;
    }
    
    if (lowerCaseMessage.includes("hotel") || lowerCaseMessage.includes("stay") || lowerCaseMessage.includes("accommodation")) {
      return `For accommodations in ${destination || "Maharashtra"}, I recommend looking at options in central areas for convenience. Budget options range from ₹1,500-3,000 per night, while luxury options start from ₹7,000. OYO Rooms and local guesthouses offer good value for money.`;
    }
    
    if (lowerCaseMessage.includes("food") || lowerCaseMessage.includes("restaurant") || lowerCaseMessage.includes("eat")) {
      return `Maharashtra cuisine is diverse and flavorful! Don't miss trying Vada Pav, Pav Bhaji, and Misal Pav. In ${destination || "most cities"}, you'll find great street food options as well as fine dining restaurants serving authentic Maharashtrian thalis.`;
    }
    
    if (lowerCaseMessage.includes("transport") || lowerCaseMessage.includes("travel") || lowerCaseMessage.includes("commute")) {
      return `For getting around in ${destination || "Maharashtra"}, local trains are the lifeline in Mumbai, while auto-rickshaws and cabs are available in most cities. For intercity travel, MSRTC buses, trains, and domestic flights connect major destinations.`;
    }
    
    if (lowerCaseMessage.includes("budget") || lowerCaseMessage.includes("cost") || lowerCaseMessage.includes("expense")) {
      return `A comfortable trip in Maharashtra would cost around ₹3,000-5,000 per day per person including accommodation, food, and local transport. Major expenses include accommodation (₹1,500-3,000) and intercity travel. Street food meals cost around ₹100-200, while restaurant meals range from ₹300-800 per person.`;
    }
    
    if (dest.includes("mumbai") || lowerCaseMessage.includes("mumbai")) {
      return `Mumbai is the vibrant financial capital of India with attractions like Gateway of India, Marine Drive, and Elephanta Caves. Don't miss the street food scene and the local train experience. A 3-day trip would cost approximately ₹15,000-20,000 per person including stay, food, and local travel.`;
    }
    
    if (dest.includes("pune") || lowerCaseMessage.includes("pune")) {
      return `Pune is a cultural hub with a pleasant climate. Visit Shaniwar Wada, Aga Khan Palace, and enjoy the vibrant café culture. The city has excellent options for food lovers. A 3-day trip would cost approximately ₹12,000-18,000 per person.`;
    }
    
    if (dest.includes("lonavala") || lowerCaseMessage.includes("lonavala")) {
      return `Lonavala is a scenic hill station perfect for weekend getaways. The highlights include Bhushi Dam, Tiger Point, and Karla Caves. Don't forget to try the famous chikki (sweet). A weekend trip would cost around ₹8,000-15,000 per person.`;
    }
    
    // Default response
    return `I'd be happy to help with your travel plans in Maharashtra! Whether you're interested in bustling cities like Mumbai and Pune, or serene spots like Lonavala and Mahabaleshwar, I can provide recommendations for accommodations, transportation, and must-visit attractions that match your preferences and budget.`;
  };
  