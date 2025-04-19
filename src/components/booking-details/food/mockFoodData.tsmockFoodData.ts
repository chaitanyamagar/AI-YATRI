
import { ExtendedFoodOption } from './FoodCard';

export const getMockFoodOptions = (destination: string, userLocation?: string): ExtendedFoodOption[] => {
  // Use userLocation if available, otherwise use destination for location-based options
  const locationForSearch = userLocation || destination;
  
  return [
    {
      id: 'food-1',
      name: 'Breakfast Package',
      type: 'buffet',
      price: 3500,
      restaurant: 'Grand Spice Restaurant',
      description: 'Start your day right with our comprehensive breakfast buffet featuring both Indian and Continental options. Available daily from 7:00 AM to 10:30 AM.',
      location: `Central ${destination}, near Market Square`,
      mapUrl: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent('Grand Spice Restaurant ' + destination)}`,
      externalUrl: `https://www.google.com/maps/search/${encodeURIComponent('Grand Spice Restaurant ' + destination)}`,
      reviews: [
        {
          author: "Anita R.",
          rating: 4.5,
          comment: "Excellent breakfast spread with both Indian and Continental options.",
          date: "2 months ago"
        },
        {
          author: "Sanjeev T.",
          rating: 4,
          comment: "Fresh food and great variety. Loved the South Indian options.",
          date: "1 month ago"
        },
        {
          author: "Meera P.",
          rating: 5,
          comment: "Best breakfast buffet in the city. Worth every penny!",
          date: "3 weeks ago"
        }
      ],
      amenities: ['Veg & Non-veg Options', 'Fresh Juices', 'Live Stations', 'Dietary Accommodations']
    },
    {
      id: 'food-2',
      name: 'Dinner Experience',
      type: 'a-la-carte',
      price: 5000,
      restaurant: 'Royal Kitchen',
      description: 'Experience the royal flavors of authentic cuisine with our curated dinner menu. Includes a 4-course meal with signature dishes and a complimentary glass of wine.',
      location: `Downtown ${destination}, Heritage District`,
      mapUrl: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent('Royal Kitchen ' + destination)}`,
      externalUrl: `https://www.google.com/maps/search/${encodeURIComponent('Royal Kitchen ' + destination)}`,
      reviews: [
        {
          author: "Rohan K.",
          rating: 5,
          comment: "Exceptional dining experience with attentive service. The Lamb Biryani is outstanding.",
          date: "1 month ago"
        },
        {
          author: "Priyanka S.",
          rating: 4.5,
          comment: "Beautiful ambiance and delicious food. Slightly expensive but worth it for special occasions.",
          date: "3 weeks ago"
        },
        {
          author: "Ajay M.",
          rating: 4,
          comment: "Great flavors and presentation. The dessert selection is excellent.",
          date: "2 months ago"
        }
      ],
      amenities: ['Fine Dining', 'Vegetarian Options', 'Wine Pairing', 'Dessert Selection']
    },
    {
      id: 'food-3',
      name: 'Full Board Package',
      type: 'special',
      price: 9000,
      restaurant: 'Various Hotel Restaurants',
      description: 'Comprehensive meal plan covering breakfast, lunch, and dinner throughout your stay. Enjoy a variety of cuisines at multiple hotel restaurants.',
      location: `Throughout ${destination}`,
      mapUrl: `https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=${encodeURIComponent('restaurants in ' + destination)}`,
      externalUrl: `https://www.google.com/maps/search/${encodeURIComponent('restaurants in ' + destination)}`,
      reviews: [
        {
          author: "Nikhil J.",
          rating: 4,
          comment: "Convenient option for our entire stay. Good variety across restaurants.",
          date: "1 month ago"
        },
        {
          author: "Deepika R.",
          rating: 3.5,
          comment: "Great value for money. Some restaurants are better than others.",
          date: "2 weeks ago"
        },
        {
          author: "Arjun P.",
          rating: 4.5,
          comment: "Excellent service and food quality at all included restaurants.",
          date: "3 months ago"
        }
      ],
      amenities: ['Multiple Cuisines', 'All Meals Included', 'Special Dietary Options', 'In-room Dining']
    },
    {
      id: 'food-4',
      name: 'Street Food Tour',
      type: 'special',
      price: 2000,
      restaurant: `${destination} Food Walk`,
      description: `Experience the authentic flavors of ${destination} with our guided street food tour. Visit 5-6 renowned street food stalls and learn about local culinary traditions.`,
      location: `Old ${destination} Market Area`,
      mapUrl: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent('food street ' + destination)}`,
      externalUrl: `https://www.google.com/maps/search/${encodeURIComponent('street food in ' + destination)}`,
      reviews: [
        {
          author: "Ravi S.",
          rating: 5,
          comment: "Amazing experience! The guide was knowledgeable and took us to authentic places we wouldn't have found ourselves.",
          date: "2 weeks ago"
        },
        {
          author: "Sunita G.",
          rating: 4.5,
          comment: "Delicious food and interesting insights into local culture. Come hungry!",
          date: "1 month ago"
        },
        {
          author: "Tony M.",
          rating: 5,
          comment: "Best food tour I've ever taken. Great value and unforgettable flavors.",
          date: "3 weeks ago"
        }
      ],
      amenities: ['Guided Tour', 'Multiple Tastings', 'Cultural Insights', 'Small Groups']
    },
    {
      id: 'food-5',
      name: 'Romantic Dinner',
      type: 'a-la-carte',
      price: 4500,
      restaurant: 'Skyview Restaurant',
      description: 'Special candlelit dinner for two with panoramic city views. Includes a 5-course gourmet meal, premium wine, and personalized service.',
      location: `${destination} Heights, Tower Building`,
      mapUrl: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent('Skyview Restaurant ' + destination)}`,
      externalUrl: `https://www.google.com/maps/search/${encodeURIComponent('Skyview Restaurant ' + destination)}`,
      reviews: [
        {
          author: "Rahul & Neha",
          rating: 5,
          comment: "Perfect romantic setting with breathtaking views. The service was exceptional and the food divine.",
          date: "1 month ago"
        },
        {
          author: "Aditya K.",
          rating: 4.5,
          comment: "Amazing experience for our anniversary. The sunset view was spectacular and the food matched the ambiance.",
          date: "2 months ago"
        },
        {
          author: "Sophie P.",
          rating: 5,
          comment: "Worth every penny! The chef's special menu was innovative and delicious.",
          date: "3 weeks ago"
        }
      ],
      amenities: ['Panoramic Views', 'Premium Wine', 'Personalized Service', 'Special Occasion Setup']
    },
    {
      id: 'food-6',
      name: 'Cooking Class',
      type: 'special',
      price: 3000,
      restaurant: 'Flavor Academy',
      description: `Learn to cook authentic ${destination} specialties with our expert chefs. This hands-on class includes all ingredients, recipe booklet, and a full meal of your creations.`,
      location: `${destination} Cultural District`,
      mapUrl: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent('Cooking Class ' + destination)}`,
      externalUrl: `https://www.google.com/maps/search/${encodeURIComponent('Cooking Class ' + destination)}`,
      reviews: [
        {
          author: "Vikram S.",
          rating: 5,
          comment: "Fantastic experience! Chef was patient and knowledgeable. Learned techniques I'll use forever.",
          date: "1 month ago"
        },
        {
          author: "Lisa T.",
          rating: 4.5,
          comment: "Fun and informative class. Great way to learn about local cuisine and culture.",
          date: "3 weeks ago"
        },
        {
          author: "Ramesh P.",
          rating: 4,
          comment: "Well-organized class with good hands-on experience. Recipes were easy to follow.",
          date: "2 months ago"
        }
      ],
      amenities: ['Expert Instruction', 'All Ingredients Included', 'Recipe Booklet', 'Full Meal']
    },
  ];
};

// Default/fallback options when API call fails
export const getDefaultFoodOptions = (destination: string): ExtendedFoodOption[] => {
  return [
    {
      id: 'food-1-default',
      name: 'Breakfast Package',
      type: 'buffet',
      price: 3500,
      restaurant: 'Hotel Restaurant',
      description: 'Daily buffet breakfast for 2 people for the entire stay',
      location: `Central ${destination}`,
      mapUrl: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent('restaurant in ' + destination)}`,
      externalUrl: `https://www.google.com/maps/search/${encodeURIComponent('restaurant in ' + destination)}`,
    },
    {
      id: 'food-2-default',
      name: 'Dinner Experience',
      type: 'a-la-carte',
      price: 5000,
      restaurant: 'Local Restaurant',
      description: 'Fine dining dinner with local specialties (one-time)',
      location: `Downtown ${destination}`,
      mapUrl: `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent('fine dining in ' + destination)}`,
      externalUrl: `https://www.google.com/maps/search/${encodeURIComponent('fine dining in ' + destination)}`,
    },
  ];
};
