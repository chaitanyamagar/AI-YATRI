// Location-specific attractions and recommendations
export interface LocationData {
  attractions: string[];
  temples: string[];
  restaurants: string[];
  hotels: {
    budget: string[];
    midRange: string[];
    luxury: string[];
  };
  activities: string[];
}

export const locationSpecificData: Record<string, LocationData> = {
  "Mumbai": {
    attractions: ["Gateway of India", "Marine Drive", "Elephanta Caves", "Juhu Beach", "Sanjay Gandhi National Park"],
    temples: ["Siddhivinayak Temple", "ISKCON Temple", "Mahalakshmi Temple"],
    restaurants: ["Leopold Cafe", "Trishna", "Britannia & Co.", "Bastian", "The Table"],
    hotels: {
      budget: ["Hotel Residency Fort", "Treebo Trip Garden", "FabHotel Ascot International"],
      midRange: ["The Gordon House", "Fariyas Hotel", "Radisson Mumbai Goregaon"],
      luxury: ["The Taj Mahal Palace", "The Oberoi", "Four Seasons Hotel", "JW Marriott Mumbai Juhu"]
    },
    activities: ["Bollywood tour", "Street food tour in Mohammed Ali Road", "Ferry ride to Elephanta Caves", "Shopping at Colaba Causeway"]
  },
  "Pune": {
    attractions: ["Aga Khan Palace", "Shaniwar Wada", "Osho Ashram", "Dagdusheth Halwai Ganpati Temple", "Sinhagad Fort"],
    temples: ["Dagdusheth Halwai Ganpati Temple", "Pataleshwar Cave Temple", "ISKCON NVCC Temple"],
    restaurants: ["Malaka Spice", "Vohuman Cafe", "Goodluck Cafe", "Savya Rasa", "Le Plaisir"],
    hotels: {
      budget: ["FabHotel Prime Royal", "Treebo Trend Viman Nagar", "OYO 355 Hotel Harmony"],
      midRange: ["Novotel Pune", "Lemon Tree Premier", "The Pride Hotel"],
      luxury: ["JW Marriott Hotel Pune", "The Westin Pune", "Conrad Pune", "Hyatt Regency Pune"]
    },
    activities: ["Trekking to Sinhagad Fort", "Pune heritage walk", "Wine tasting in Nashik vineyards", "Shopping at MG Road"]
  },
  "Nashik": {
    attractions: ["Trimbakeshwar Temple", "Sula Vineyards", "Pandavleni Caves", "Coin Museum", "Kalaram Temple"],
    temples: ["Trimbakeshwar Temple", "Kalaram Temple", "Saptashrungi Devi Temple"],
    restaurants: ["Barbeque Ville", "Sula Vineyards Restaurant", "Sadhana Restaurant", "Veg Aroma"],
    hotels: {
      budget: ["Hotel Panchavati", "OYO 36755 Hotel City Park", "FabHotel Sai Leela"],
      midRange: ["Express Inn", "Gateway Hotel Ambad", "The Source at Sula"],
      luxury: ["Radisson Blu Hotel & Spa", "Taj Gateway", "Beyond by Sula"]
    },
    activities: ["Wine tasting tours", "Godavari Ghat visit", "Tribal museum tour", "Ramkund visit"]
  },
  "Lonavala": {
    attractions: ["Bhushi Dam", "Karla Caves", "Lohagad Fort", "Lonavala Lake", "Tiger's Leap"],
    temples: ["Ekvira Devi Temple", "Shri Narayani Dham", "Swami Narayan Temple"],
    restaurants: ["Rama Krishna", "The Kinara Village Dhaba", "Buvachi Misal", "German Bakery"],
    hotels: {
      budget: ["Hotel Chandralok", "United-21 Resort", "OYO 10674 Resort Amonora"],
      midRange: ["The Machan", "Upper Deck Resort", "Cosset Mountain Resort"],
      luxury: ["Hilton Shillim Estate Retreat & Spa", "Rhythm Lonavala", "The Dukes Retreat"]
    },
    activities: ["Trekking to Lohagad Fort", "Boating at Pawna Lake", "Chikki shopping", "Waterfall visits in monsoon"]
  },
  "Mahabaleshwar": {
    attractions: ["Venna Lake", "Lingmala Waterfall", "Pratapgad Fort", "Mapro Garden", "Arthur's Seat"],
    temples: ["Mahabaleshwar Temple", "Krishnabai Temple", "Panchganga Temple"],
    restaurants: ["The Grapevine", "Mapro Garden Restaurant", "Bagicha Corner", "Brightland Resort"],
    hotels: {
      budget: ["Hotel Shivsagar", "Treebo Trip Hill Forest", "OYO 13159 Hotel Hill Forest"],
      midRange: ["Le Meridien Mahabaleshwar Resort & Spa", "Evershine Keys Resort", "Bella Vista Resort"],
      luxury: ["Radisson Resort & Spa Mahabaleshwar", "Brightland Resort & Spa", "The Fern Mahabaleshwar"]
    },
    activities: ["Strawberry picking", "Horse riding at Venna Lake", "Hiking to Wilson Point", "Shopping for jams and honey"]
  },
  "Sinhagad Fort": {
    attractions: ["Lion Gate", "Kalyan Darwaja", "Tanaji Memorial", "Rajaram's Tomb", "Kondana Caves"],
    temples: ["Tanaji Memorial Temple", "Kalyan Temple", "Kondhaneshwar Temple"],
    restaurants: ["Sinhagad Amrutulya", "Sinhagad Food Court", "Mountain View Restaurant", "Sinhagad Vadewale"],
    hotels: {
      budget: ["Sinhagad Homestay", "Camping Tents at Sinhagad", "Devkund Farms"],
      midRange: ["MTDC Resort Sinhagad", "Madhavi Farm", "Green Valley Resort"],
      luxury: ["The Fort Resort", "Forest County Sinhagad", "Sinhagad Valley Resort"]
    },
    activities: ["Hiking to the fort", "Sunrise/sunset photography", "Historical guided tour", "Nature trail around the fort", "Camping near the fort"]
  },
  "Raigad Fort": {
    attractions: ["Maha Darwaja", "Queen's Palace", "Jagdishwar Temple", "Rope-way", "Takmak Tok"],
    temples: ["Jagdishwar Temple", "Shirkai Devi Temple", "Gangasagar Lake"],
    restaurants: ["Raigad Food Court", "MTDC Raigad Restaurant", "Sahyadri Hotel", "Local Malvani Food Stalls"],
    hotels: {
      budget: ["MTDC Dormitory", "Raigad Village Homestay", "Shivneri Rooms"],
      midRange: ["MTDC Resort Raigad", "Hotel Kohinoor Raigad", "Mountain View Residency"],
      luxury: ["The Fern Raigad", "Royal Heritage Resort", "Mountain Retreat Raigad"]
    },
    activities: ["Rope-way ride", "Historical guided tour", "Trekking around the fort", "Photography session", "Cultural performance viewing"]
  },
  "Rajgad Fort": {
    attractions: ["Padmavati Machi", "Sanjivani Machi", "Balekilla", "Nedh (Secret Passage)", "Pali Darwaja"],
    temples: ["Padmavati Temple", "Rajgad Mandir", "Ancient Shrine"],
    restaurants: ["Rajgad Trek Canteen", "Mountain Top Food Stalls", "Village Food Court", "Pali Village Homestay Food"],
    hotels: {
      budget: ["Camping at Rajgad", "Trekkers Dormitory", "Village Homestay Near Pali"],
      midRange: ["Rajgad Valley Resort", "Gunjavane Resort", "Velhe Retreat"],
      luxury: ["Rajgad Heritage Stay", "Mountain Expedition Resort", "Fort View Luxury Camp"]
    },
    activities: ["Overnight camping", "Fort history tour", "Trekking to different machis", "Birdwatching", "Secret passage exploration"]
  },
  "Torna Fort": {
    attractions: ["Menghai Goddess Temple", "Budhla Machi", "Zunjar Machi", "Konkan Darwaja", "Bini Darwaja"],
    temples: ["Menghai Goddess Temple", "Ancient Fort Shrine", "Budhla Temple"],
    restaurants: ["Trek Canteen at Velhe", "Torna Base Food Stalls", "Summit Food Court", "Village Meals"],
    hotels: {
      budget: ["Torna Trekkers Halt", "Base Village Homestay", "Camping at Zunjar Machi"],
      midRange: ["Velhe Mountain Resort", "Torna Trek Resort", "Green Valley View"],
      luxury: ["Fort Heritage Retreat", "Mountain Adventure Resort", "Sahyadri Valley Resort"]
    },
    activities: ["Challenging trek", "Camping at the top", "Sunrise view from Zunjar Machi", "Rock climbing", "Historical exploration"]
  }
};

// Get location-specific data with fallback
export const getLocationData = (destination: string): LocationData => {
  // Try exact match first
  if (locationSpecificData[destination]) {
    return locationSpecificData[destination];
  }
  
  // Try partial match
  const partialMatch = Object.keys(locationSpecificData).find(
    key => destination.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(destination.toLowerCase())
  );
  
  if (partialMatch) {
    return locationSpecificData[partialMatch];
  }
  
  // Default fallback data
  return {
    attractions: ["Local sightseeing", "Historical monuments", "Natural landscapes", "Cultural experiences"],
    temples: ["Local temples", "Religious sites"],
    restaurants: ["Local cuisine restaurants", "Traditional eateries", "Street food corners"],
    hotels: {
      budget: ["Budget stays", "OYO rooms", "Guesthouses"],
      midRange: ["3-star hotels", "Boutique stays"],
      luxury: ["Luxury resorts", "Premium hotels"]
    },
    activities: ["Local sightseeing", "Shopping", "Cultural experiences", "Food tours"]
  };
};
