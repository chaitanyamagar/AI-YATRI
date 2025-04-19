import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Hero = () => {
  const scrollToDestinations = () => {
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 z-10 dark:from-black/60 dark:to-black/40"></div>
        <img 
          src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Maharashtra Landscape" 
          className="w-full h-full object-cover animate-pulse-soft"
          style={{ animationDuration: '30s' }}
        />
      </div>

      <div className="container-custom relative z-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col justify-center">
            <div className="space-y-6 max-w-xl">
              <span className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
                Discover Maharashtra
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight animate-fade-in" style={{ animationDelay: '0.5s' }}>
                Your <span className="text-yatri-orange-light">AI-Powered</span> Travel Companion
              </h1>
              
              <p className="text-lg text-white/90 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                Experience the perfect trip with personalized recommendations, seamless bookings, and smart itineraries tailored just for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <Link to="/trip-planner" className="btn-primary bg-yatri-orange hover:bg-yatri-orange-dark">
                  Plan My Trip
                </Link>
                <Link to="/destinations" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Explore Destinations
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:mt-0 mt-8 flex items-center justify-center animate-fade-in" style={{ animationDelay: '1.1s' }}>
            <div className="w-full max-w-md glass rounded-2xl p-6 transform hover:scale-[1.01] transition-transform">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Button */}
      <button 
        onClick={scrollToDestinations}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center animate-fade-in animate-float"
        style={{ animationDelay: '1.5s' }}
      >
        <span className="text-white text-sm mb-2">Scroll Down</span>
        <ChevronDown className="w-6 h-6 text-white" />
      </button>
    </section>
  );
};

export default Hero;
