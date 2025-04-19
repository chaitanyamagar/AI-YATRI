
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Hotel, Landmark, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DestinationSuggestionsProps {
  destination: string;
}

// This component displays AI suggestions for a specific destination
const DestinationSuggestions = ({ destination }: DestinationSuggestionsProps) => {
  // Function to generate Google Maps link for the destination
  const getGoogleMapsLink = (place: string) => {
    return `https://www.google.com/maps/search/${encodeURIComponent(place)}`;
  };

  // Destination data for all locations
  const destinationsData: Record<string, {
    topPlaces: string[],
    temples: string[],
    hotels: string[],
    nearbyPlaces: string[]
  }> = {
    "Mumbai": {
      topPlaces: [
        "Gateway of India",
        "Marine Drive",
        "Elephanta Caves",
        "Chhatrapati Shivaji Terminus",
        "Juhu Beach"
      ],
      temples: [
        "Siddhivinayak Temple",
        "ISKCON Temple",
        "Mumba Devi Temple",
        "Mahalakshmi Temple",
        "Babulnath Temple"
      ],
      hotels: [
        "The Taj Mahal Palace",
        "The Oberoi Mumbai",
        "ITC Grand Central",
        "Trident Nariman Point",
        "The Leela Mumbai"
      ],
      nearbyPlaces: [
        "Lonavala (83 km)",
        "Alibaug (95 km)",
        "Matheran (80 km)",
        "Pune (148 km)",
        "Nasik (166 km)"
      ]
    },
    "Pune": {
      topPlaces: [
        "Aga Khan Palace",
        "Shaniwar Wada",
        "Sinhagad Fort",
        "Dagdusheth Halwai Ganapati Temple",
        "Pune-Okayama Friendship Garden"
      ],
      temples: [
        "Dagdusheth Halwai Ganapati Temple",
        "Pataleshwar Cave Temple",
        "ISKCON NVCC Temple",
        "Chaturshringi Temple",
        "Kasba Ganpati Temple"
      ],
      hotels: [
        "The Conrad Pune",
        "JW Marriott Hotel Pune",
        "The Westin Pune",
        "Novotel Pune",
        "Hyatt Pune"
      ],
      nearbyPlaces: [
        "Lonavala (65 km)",
        "Khandala (70 km)",
        "Mahabaleshwar (120 km)",
        "Lavasa (60 km)",
        "Panchgani (100 km)"
      ]
    },
    "Nashik": {
      topPlaces: [
        "Sula Vineyards",
        "Trimbakeshwar Temple",
        "Pandavleni Caves",
        "Coin Museum",
        "Ramkund"
      ],
      temples: [
        "Trimbakeshwar Temple",
        "Kalaram Temple",
        "Saptashrungi Devi Temple",
        "Muktidham Temple",
        "Someshwar Temple"
      ],
      hotels: [
        "The Gateway Hotel Ambad",
        "Express Inn",
        "Radisson Blu Hotel & Spa",
        "The Source at Sula",
        "Ginger Nashik"
      ],
      nearbyPlaces: [
        "Trimbakeshwar (28 km)",
        "Shirdi (87 km)",
        "Igatpuri (45 km)",
        "Bhandardara (72 km)",
        "Saputara (75 km)"
      ]
    },
    "Lonavala": {
      topPlaces: [
        "Bhushi Dam",
        "Karla Caves",
        "Lohagad Fort",
        "Tiger's Leap",
        "Lonavala Lake"
      ],
      temples: [
        "Bhaja Caves",
        "Narayani Dham Temple",
        "Ekvira Devi Temple",
        "Shri Vigneshwar Mandir",
        "Swami Narayan Temple"
      ],
      hotels: [
        "The Machan",
        "Hilton Shillim Estate Retreat & Spa",
        "Della Resorts",
        "The Dukes Retreat",
        "Fariyas Resort"
      ],
      nearbyPlaces: [
        "Khandala (5 km)",
        "Pune (65 km)",
        "Mumbai (83 km)",
        "Matheran (45 km)",
        "Mahabaleshwar (120 km)"
      ]
    },
    "Mahabaleshwar": {
      topPlaces: [
        "Venna Lake",
        "Pratapgad Fort",
        "Arthur's Seat",
        "Lingmala Waterfall",
        "Elephant's Head Point"
      ],
      temples: [
        "Mahabaleshwar Temple",
        "Panchganga Temple",
        "Krishnabai Temple",
        "Atibaleshwar Temple",
        "Shri Hanuman Mandir"
      ],
      hotels: [
        "Le Meridien Mahabaleshwar Resort & Spa",
        "Brightland Resort & Spa",
        "Evershine Keys Resort",
        "The Dukes Retreat",
        "Bella Vista Resort"
      ],
      nearbyPlaces: [
        "Panchgani (19 km)",
        "Wai (35 km)",
        "Pune (120 km)",
        "Satara (45 km)",
        "Lonavala (100 km)"
      ]
    },
    "Kolhapur": {
      topPlaces: [
        "Mahalaxmi Temple",
        "New Palace",
        "Rankala Lake",
        "Panhala Fort",
        "Jyotiba Temple"
      ],
      temples: [
        "Mahalaxmi Temple",
        "Jyotiba Temple",
        "Temblai Temple",
        "Kopeshwar Temple",
        "Binkhambi Ganesh Mandir"
      ],
      hotels: [
        "The Pavilion",
        "Hotel Sayaji",
        "Citrus Hotel",
        "Shalini Palace",
        "Hotel Opal"
      ],
      nearbyPlaces: [
        "Panhala (20 km)",
        "Gaganbawda (45 km)",
        "Ratnagiri (115 km)",
        "Amboli (110 km)",
        "Goa (220 km)"
      ]
    },
    "Ratnagiri": {
      topPlaces: [
        "Ganpatipule Beach",
        "Ratnadurg Fort",
        "Thibaw Palace",
        "Mandavi Beach",
        "Bhatye Beach"
      ],
      temples: [
        "Ganpatipule Temple",
        "Swayambhu Shiva Temple",
        "Parshuram Temple",
        "Pawas Math",
        "Swami Swaroopanand Temple"
      ],
      hotels: [
        "Blue Ocean Resort & Spa",
        "Kohinoor Samudra Beach Resort",
        "Atithi Parinay",
        "Hotel Sea Princess",
        "The Fern Bison Resort"
      ],
      nearbyPlaces: [
        "Ganpatipule (25 km)",
        "Guhagar (45 km)",
        "Dapoli (85 km)",
        "Kolhapur (115 km)",
        "Alibaug (185 km)"
      ]
    },
    "Matheran": {
      topPlaces: [
        "Charlotte Lake",
        "Echo Point",
        "Panorama Point",
        "One Tree Hill Point",
        "Louisa Point"
      ],
      temples: [
        "Pisarnath Mahadev Mandir",
        "Khandala Point",
        "Pandurang Temple",
        "Chandni Temple",
        "Garbett Temple"
      ],
      hotels: [
        "The Verandah in the Forest",
        "Adamo The Resort",
        "Lords Central Hotel",
        "Hotel Panorama",
        "Horseland Hotel and Mountain Spa"
      ],
      nearbyPlaces: [
        "Karjat (15 km)",
        "Neral (8 km)",
        "Lonavala (45 km)",
        "Mumbai (80 km)",
        "Pune (120 km)"
      ]
    },
    "Alibag": {
      topPlaces: [
        "Alibag Beach",
        "Kolaba Fort",
        "Kanakeshwar Temple",
        "Kashid Beach",
        "Murud-Janjira Fort"
      ],
      temples: [
        "Kanakeshwar Temple",
        "Vikram Vinayak Temple",
        "Datta Mandir",
        "Nagoba Temple",
        "Brahma Kuti Temple"
      ],
      hotels: [
        "Radisson Blu Resort & Spa",
        "U Tropicana Resort",
        "Mango Beach House",
        "Outpost@Alibaug",
        "Jolly Bol Resort"
      ],
      nearbyPlaces: [
        "Kashid (30 km)",
        "Murud (50 km)",
        "Revdanda (10 km)",
        "Mumbai (95 km)",
        "Pune (140 km)"
      ]
    },
    "Panchgani": {
      topPlaces: [
        "Table Land",
        "Mapro Garden",
        "Sydney Point",
        "Parsi Point",
        "Devil's Kitchen"
      ],
      temples: [
        "Dhom Dam Temple",
        "Krishnaji Temple",
        "Mahabaleshwar Temple",
        "Ganesh Temple",
        "Pataleshwar Temple"
      ],
      hotels: [
        "Ravine Hotel",
        "Hotel Mount View",
        "Prospect Hotel",
        "Hotel Millennium Park",
        "Girivan Resort"
      ],
      nearbyPlaces: [
        "Mahabaleshwar (19 km)",
        "Wai (10 km)",
        "Satara (45 km)",
        "Pune (100 km)",
        "Lonavala (120 km)"
      ]
    },
    "Khandala": {
      topPlaces: [
        "Duke's Nose",
        "Tiger's Leap",
        "Bhushi Dam",
        "Reversing Station",
        "Rajmachi Point"
      ],
      temples: [
        "Bushi Dam Temple",
        "Ekvira Aai Temple",
        "Shri Swami Samartha Mandir",
        "St. Mary's Church",
        "Kune Waterfall Temple"
      ],
      hotels: [
        "Duke's Retreat",
        "Rhythm Lonavala",
        "The Machan",
        "Zara's Resort",
        "Novotel Imagica"
      ],
      nearbyPlaces: [
        "Lonavala (5 km)",
        "Karjat (25 km)",
        "Pune (70 km)",
        "Mumbai (80 km)",
        "Matheran (45 km)"
      ]
    }
  };

  // Find data for the current destination
  // Normalize the destination name for matching
  const normalizedDestination = destination.trim().toLowerCase();
  
  // Try to find the destination data by doing a partial match
  const destinationKey = Object.keys(destinationsData).find(key => 
    normalizedDestination.includes(key.toLowerCase())
  );
  
  // If no destination data is found
  if (!destinationKey) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-500 dark:text-gray-400">
            AI suggestions are currently not available for this destination.
          </p>
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.open(getGoogleMapsLink(destination), '_blank')}
            >
              Explore on Google Maps
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get data for the found destination
  const locationData = destinationsData[destinationKey];

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4 dark:text-white">
          AI-Powered Suggestions for {destinationKey}
        </h3>

        <div className="mb-6">
          <a 
            href={getGoogleMapsLink(destinationKey)} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-yatri-blue hover:underline"
          >
            <Navigation className="w-5 h-5 mr-2" />
            View {destinationKey} on Google Maps
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

        <div className="space-y-5">
          <div>
            <h4 className="text-md font-medium mb-2 flex items-center dark:text-white">
              <Landmark className="w-4 h-4 mr-2 text-yatri-orange" />
              Top Places to Visit
            </h4>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-300">
              {locationData.topPlaces.map((place, index) => (
                <li key={index}>
                  <a 
                    href={getGoogleMapsLink(place + ", " + destinationKey)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline text-sm flex items-center"
                  >
                    {place}
                    <ExternalLink className="w-3 h-3 ml-1 inline-block text-gray-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-md font-medium mb-2 flex items-center dark:text-white">
              <Landmark className="w-4 h-4 mr-2 text-yatri-orange" />
              Famous Temples
            </h4>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-300">
              {locationData.temples.map((temple, index) => (
                <li key={index}>
                  <a 
                    href={getGoogleMapsLink(temple + ", " + destinationKey)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline text-sm flex items-center"
                  >
                    {temple}
                    <ExternalLink className="w-3 h-3 ml-1 inline-block text-gray-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-md font-medium mb-2 flex items-center dark:text-white">
              <Hotel className="w-4 h-4 mr-2 text-yatri-orange" />
              Recommended Hotels
            </h4>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-300">
              {locationData.hotels.map((hotel, index) => (
                <li key={index}>
                  <a 
                    href={getGoogleMapsLink(hotel + ", " + destinationKey)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline text-sm flex items-center"
                  >
                    {hotel}
                    <ExternalLink className="w-3 h-3 ml-1 inline-block text-gray-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-md font-medium mb-2 flex items-center dark:text-white">
              <Navigation className="w-4 h-4 mr-2 text-yatri-orange" />
              Nearby Places
            </h4>
            <ul className="list-disc pl-6 space-y-1 dark:text-gray-300">
              {locationData.nearbyPlaces.map((place, index) => (
                <li key={index}>
                  <a 
                    href={getGoogleMapsLink(place.split(" (")[0])} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline text-sm flex items-center"
                  >
                    {place}
                    <ExternalLink className="w-3 h-3 ml-1 inline-block text-gray-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.open(getGoogleMapsLink(destinationKey), '_blank')}
          >
            Explore More on Google Maps
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationSuggestions;
