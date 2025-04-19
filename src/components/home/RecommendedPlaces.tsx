
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { destinationsData } from '../../data/destinations';

// Category filters
const categories = [
  'All', 'Historical', 'UNESCO Heritage', 'Hill Station', 'Beach', 'Spiritual', 'Weekend Getaway'
];

// Get first 6 destinations for home page
const placesData = destinationsData.slice(0, 6).map(destination => ({
  ...destination,
  category: ['Historical', 'UNESCO Heritage', 'Hill Station', 'Beach', 'Spiritual', 'Weekend Getaway'][
    Math.floor(Math.random() * 6)
  ] // Assign a random category for demonstration
}));

const RecommendedPlaces = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredPlaces = activeCategory === 'All' 
    ? placesData 
    : placesData.filter(place => place.category === activeCategory);

  const scrollCategories = (direction: 'left' | 'right') => {
    const container = document.getElementById('categories-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="destinations" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 text-sm font-medium text-yatri-blue bg-yatri-blue/10 rounded-full mb-3">
            Top Destinations
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 dark:text-white">
            Recommended Places in Maharashtra
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover the most beautiful and culturally rich destinations that Maharashtra has to offer for your next unforgettable journey.
          </p>
        </div>

        {/* Categories filter */}
        <div className="relative mb-8">
          {/* Scroll buttons */}
          <button 
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 md:flex hidden items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          
          <div id="categories-container" className="flex items-center space-x-3 overflow-x-auto py-2 scrollbar-hide px-4 md:px-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-yatri-blue text-white dark:bg-yatri-blue-dark'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 md:flex hidden items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Grid of places */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaces.map(place => (
            <div key={place.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm card-hover animate-fade-up">
              <div className="relative">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="w-full h-52 object-cover"
                  loading="lazy"
                />
                <button 
                  onClick={() => toggleFavorite(place.id)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/70 dark:bg-black/50 backdrop-blur-md hover:bg-white dark:hover:bg-black/70 transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${favorites.includes(place.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
                  />
                </button>
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/70 dark:bg-black/50 backdrop-blur-md text-xs font-medium text-gray-800 dark:text-white">
                  {place.category}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-display font-semibold text-gray-800 dark:text-white">
                    {place.name}
                  </h3>
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="font-medium dark:text-white">{place.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{place.name}, Maharashtra</span>
                </div>
                <Link to={`/destination/${place.id}`}>
                  <button className="w-full py-2 rounded-lg border border-yatri-blue dark:border-yatri-blue-light text-yatri-blue dark:text-yatri-blue-light font-medium hover:bg-yatri-blue/5 dark:hover:bg-yatri-blue/10 transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/destinations" className="btn-secondary">
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecommendedPlaces;
