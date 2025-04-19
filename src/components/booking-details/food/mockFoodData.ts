import { FoodOption } from '../TripFormContext';

export const getMockFoodOptions = (destination: string, userLocation?: string): FoodOption[] => {
  return [
    {
      id: '1',
      name: 'Traditional Thali',
      type: 'buffet',
      price: 250,
      restaurant: 'Maharashtra Bhavan',
      description: 'A complete Indian meal with various dishes',
      selected: false
    },
    {
      id: '2',
      name: 'Street Food Platter',
      type: 'special',
      price: 150,
      restaurant: 'Local Street Food',
      description: 'Assorted popular street food items',
      selected: false
    },
    {
      id: '3',
      name: 'Dessert Special',
      type: 'a-la-carte',
      price: 100,
      restaurant: 'Sweet Corner',
      description: 'Traditional Indian sweets',
      selected: false
    },
    {
      id: '4',
      name: 'Beverage Package',
      type: 'special',
      price: 80,
      restaurant: 'Refreshment Hub',
      description: 'Assorted drinks and refreshments',
      selected: false
    }
  ];
};

export const getDefaultFoodOptions = (destination: string): FoodOption[] => {
  return [
    {
      id: 'default-1',
      name: 'Basic Meal',
      type: 'buffet',
      price: 200,
      restaurant: 'Local Restaurant',
      description: 'Simple and nutritious meal',
      selected: false
    },
    {
      id: 'default-2',
      name: 'Refreshment',
      type: 'special',
      price: 50,
      restaurant: 'Local Cafe',
      description: 'Basic drink package',
      selected: false
    }
  ];
}; 