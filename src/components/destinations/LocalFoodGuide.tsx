import { Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface LocalFoodGuideProps {
  destination: string;
  className?: string;
}

const LocalFoodGuide = ({ destination, className = "" }: LocalFoodGuideProps) => {
  // Get food options based on destination
  const getFoodOptions = () => {
    if (destination.toLowerCase().includes('mumbai')) {
      return {
        dishes: [
          {
            name: "Vada Pav",
            description: "Mumbai's most famous street food - a spicy potato fritter in a bun.",
            price: "₹15-30"
          },
          {
            name: "Pav Bhaji",
            description: "Spicy vegetable mash served with buttered bread rolls.",
            price: "₹70-120"
          },
          {
            name: "Bombay Sandwich",
            description: "Multi-layered vegetable sandwich with chutney and masala.",
            price: "₹40-80"
          },
          {
            name: "Bhel Puri",
            description: "Puffed rice, vegetables and tangy tamarind sauce.",
            price: "₹30-50"
          },
          {
            name: "Malvani Fish Curry",
            description: "Spicy coconut-based fish curry from the Konkan coast.",
            price: "₹200-400"
          }
        ],
        restaurants: [
          {
            name: "Britannia & Co.",
            location: "Ballard Estate",
            specialty: "Parsi cuisine, Berry Pulao",
            priceRange: "₹₹"
          },
          {
            name: "Leopold Cafe",
            location: "Colaba",
            specialty: "Multi-cuisine, Famous for its history",
            priceRange: "₹₹"
          },
          {
            name: "Bademiya",
            location: "Colaba",
            specialty: "Kebabs and rolls",
            priceRange: "₹₹"
          },
          {
            name: "Trishna",
            location: "Fort",
            specialty: "Seafood, Butter Garlic Crab",
            priceRange: "₹₹₹"
          },
          {
            name: "Swati Snacks",
            location: "Tardeo",
            specialty: "Traditional Gujarati snacks",
            priceRange: "₹₹"
          }
        ]
      };
    } else if (destination.toLowerCase().includes('delhi')) {
      return {
        dishes: [
          {
            name: "Chole Bhature",
            description: "Spicy chickpea curry with fried bread.",
            price: "₹60-120"
          },
          {
            name: "Butter Chicken",
            description: "Tandoori chicken in a rich buttery tomato sauce.",
            price: "₹250-400"
          },
          {
            name: "Kebabs",
            description: "Various grilled meat preparations, especially in Old Delhi.",
            price: "₹150-300"
          },
          {
            name: "Parantha",
            description: "Stuffed flatbread with various fillings from Paranthe Wali Gali.",
            price: "₹40-80"
          },
          {
            name: "Dahi Bhalla",
            description: "Lentil dumplings in yogurt with tangy chutneys.",
            price: "₹50-80"
          }
        ],
        restaurants: [
          {
            name: "Karim's",
            location: "Old Delhi",
            specialty: "Mughlai cuisine, Kebabs",
            priceRange: "₹₹"
          },
          {
            name: "Paranthe Wali Gali",
            location: "Chandni Chowk",
            specialty: "Traditional stuffed paranthas",
            priceRange: "₹"
          },
          {
            name: "Bukhara",
            location: "ITC Maurya",
            specialty: "North Indian, Dal Bukhara",
            priceRange: "₹₹₹₹"
          },
          {
            name: "Khan Chacha",
            location: "Khan Market",
            specialty: "Kebab rolls",
            priceRange: "₹₹"
          },
          {
            name: "Saravana Bhavan",
            location: "Connaught Place",
            specialty: "South Indian vegetarian",
            priceRange: "₹₹"
          }
        ]
      };
    } else {
      // Default food options for other destinations
      return {
        dishes: [
          {
            name: "Local Street Food",
            description: "Try the popular street foods of this region.",
            price: "₹20-100"
          },
          {
            name: "Regional Specialty",
            description: "This area's specialty dish with local ingredients.",
            price: "₹100-250"
          },
          {
            name: "Traditional Thali",
            description: "A complete meal with various local dishes.",
            price: "₹150-300"
          },
          {
            name: "Local Sweets",
            description: "Famous desserts and sweet dishes of the region.",
            price: "₹40-100"
          },
          {
            name: "Seasonal Delicacy",
            description: "Special dish available during this season.",
            price: "₹100-200"
          }
        ],
        restaurants: [
          {
            name: "Popular Local Eatery",
            location: "City Center",
            specialty: "Traditional local cuisine",
            priceRange: "₹₹"
          },
          {
            name: "Famous Street Food Stand",
            location: "Market Area",
            specialty: "Quick bites and street food",
            priceRange: "₹"
          },
          {
            name: "Upscale Regional Restaurant",
            location: "Tourist Area",
            specialty: "Fine dining with local flavors",
            priceRange: "₹₹₹"
          },
          {
            name: "Traveler's Favorite",
            location: "Near Attractions",
            specialty: "Tourist-friendly local food",
            priceRange: "₹₹"
          },
          {
            name: "Hidden Gem",
            location: "Off the Beaten Path",
            specialty: "Authentic local experience",
            priceRange: "₹₹"
          }
        ]
      };
    }
  };
  
  const foodOptions = getFoodOptions();
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-5 w-5 text-yatri-orange" />
          <span>Local Food Guide</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-lg mb-3">Must-Try Local Dishes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foodOptions.dishes.map((dish, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{dish.name}</h4>
                    <span className="text-sm text-yatri-orange font-medium">{dish.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {dish.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium text-lg mb-3">Recommended Restaurants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {foodOptions.restaurants.map((restaurant, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{restaurant.name}</h4>
                    <span className="text-sm text-yatri-orange font-medium">{restaurant.priceRange}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {restaurant.location}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    <span className="font-medium">Known for:</span> {restaurant.specialty}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalFoodGuide;
