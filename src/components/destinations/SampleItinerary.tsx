
import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Coffee, Sun, Moon, Star, Utensils, Hotel } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface SampleItineraryProps {
  destination: string;
}

const SampleItinerary = ({ destination }: SampleItineraryProps) => {
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(3);
  const [planType, setPlanType] = useState<'short' | 'detailed'>('detailed');
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // Here we'll generate destination-specific itineraries
    const generateItinerary = () => {
      setLoading(true);

      // Short Itineraries (1-2 days)
      const shortMumbaiItinerary = [
        {
          day: 1,
          morning: {
            activity: "Gateway of India & Taj Hotel",
            time: "8:00 AM - 11:00 AM",
            description: "Start your day with the iconic Gateway of India and the majestic Taj Mahal Palace Hotel.",
            mustVisit: true
          },
          afternoon: {
            activity: "Marine Drive & Chowpatty Beach",
            time: "12:00 PM - 3:00 PM",
            description: "Walk along the famous Marine Drive and enjoy street food at Chowpatty Beach.",
            mustVisit: true
          },
          evening: {
            activity: "Colaba Causeway Shopping",
            time: "4:00 PM - 7:00 PM",
            description: "Shop at Colaba Causeway followed by dinner at Leopold Cafe.",
            mustVisit: false
          },
          quickTips: [
            { icon: <Hotel className="h-3 w-3" />, text: "Stay near Colaba/Fort area for convenience" },
            { icon: <Utensils className="h-3 w-3" />, text: "Try Vada Pav at Ashok Vada Pav in Dadar" },
            { icon: <Star className="h-3 w-3" />, text: "Buy a tourist day pass for local trains" }
          ]
        },
        {
          day: 2,
          morning: {
            activity: "Elephanta Caves",
            time: "9:00 AM - 1:00 PM",
            description: "Take a ferry to the Elephanta Caves, a UNESCO World Heritage Site.",
            mustVisit: false
          },
          afternoon: {
            activity: "Chor Bazaar & Crawford Market",
            time: "2:00 PM - 5:00 PM",
            description: "Explore Mumbai's famous markets for souvenirs and local products.",
            mustVisit: false
          },
          evening: {
            activity: "Juhu Beach Sunset",
            time: "6:00 PM - 9:00 PM",
            description: "Enjoy sunset at Juhu Beach with famous Mumbai street food like Pav Bhaji.",
            mustVisit: true
          },
          quickTips: [
            { icon: <Clock className="h-3 w-3" />, text: "First ferry to Elephanta leaves at 9AM" },
            { icon: <Utensils className="h-3 w-3" />, text: "Must try: Pav Bhaji at Juhu Beach" },
            { icon: <Star className="h-3 w-3" />, text: "Book your return tickets if leaving today" }
          ]
        }
      ];
      
      const shortDelhiItinerary = [
        {
          day: 1,
          morning: {
            activity: "Red Fort & Jama Masjid",
            time: "9:00 AM - 12:00 PM",
            description: "Explore the historic Red Fort followed by a visit to Jama Masjid, India's largest mosque.",
            mustVisit: true
          },
          afternoon: {
            activity: "Chandni Chowk & Paranthe Wali Gali",
            time: "12:30 PM - 3:30 PM",
            description: "Shop at Chandni Chowk and enjoy traditional paranthas for lunch.",
            mustVisit: true
          },
          evening: {
            activity: "India Gate & Rashtrapati Bhavan",
            time: "4:30 PM - 7:30 PM",
            description: "Visit India Gate and drive past the Rashtrapati Bhavan and Parliament House.",
            mustVisit: false
          },
          quickTips: [
            { icon: <Hotel className="h-3 w-3" />, text: "Stay in Connaught Place for central location" },
            { icon: <Utensils className="h-3 w-3" />, text: "Try parathas at Paranthe Wali Gali" },
            { icon: <Star className="h-3 w-3" />, text: "Use Metro to avoid traffic jams" }
          ]
        },
        {
          day: 2,
          morning: {
            activity: "Qutub Minar & Humayun's Tomb",
            time: "9:00 AM - 12:30 PM",
            description: "Visit Qutub Minar, the tallest brick minaret in the world, and Humayun's Tomb.",
            mustVisit: true
          },
          afternoon: {
            activity: "Lotus Temple & ISKCON Temple",
            time: "1:30 PM - 4:30 PM",
            description: "Experience the serenity of Lotus Temple and the spirituality of ISKCON Temple.",
            mustVisit: false
          },
          evening: {
            activity: "Connaught Place & Janpath Market",
            time: "5:00 PM - 8:00 PM",
            description: "Shop at Connaught Place and Janpath Market, followed by dinner at a local restaurant.",
            mustVisit: false
          },
          quickTips: [
            { icon: <Clock className="h-3 w-3" />, text: "Visit Qutub Minar early to avoid crowds" },
            { icon: <Utensils className="h-3 w-3" />, text: "Try chaat at Bengali Market" },
            { icon: <Star className="h-3 w-3" />, text: "Book evening flight/train to maximize the day" }
          ]
        }
      ];
      
      // Standard/Detailed itineraries (3+ days)
      const mumbaiItinerary = [
        {
          day: 1,
          morning: {
            activity: "Gateway of India & Taj Hotel",
            time: "8:00 AM - 11:00 AM",
            description: "Start your day with the iconic Gateway of India and the majestic Taj Mahal Palace Hotel."
          },
          afternoon: {
            activity: "Marine Drive & Chowpatty Beach",
            time: "12:00 PM - 3:00 PM",
            description: "Walk along the famous Marine Drive and enjoy street food at Chowpatty Beach."
          },
          evening: {
            activity: "Colaba Causeway Shopping",
            time: "4:00 PM - 7:00 PM",
            description: "Shop at Colaba Causeway followed by dinner at Leopold Cafe."
          }
        },
        {
          day: 2,
          morning: {
            activity: "Elephanta Caves",
            time: "9:00 AM - 1:00 PM",
            description: "Take a ferry to the Elephanta Caves, a UNESCO World Heritage Site."
          },
          afternoon: {
            activity: "Chor Bazaar & Crawford Market",
            time: "2:00 PM - 5:00 PM",
            description: "Explore Mumbai's famous markets for souvenirs and local products."
          },
          evening: {
            activity: "Juhu Beach Sunset",
            time: "6:00 PM - 9:00 PM",
            description: "Enjoy sunset at Juhu Beach with famous Mumbai street food like Pav Bhaji."
          }
        },
        {
          day: 3,
          morning: {
            activity: "Siddhivinayak Temple & Haji Ali Dargah",
            time: "8:00 AM - 11:00 AM",
            description: "Visit the famous Siddhivinayak Temple and the beautiful Haji Ali Dargah."
          },
          afternoon: {
            activity: "Dharavi Slum Tour",
            time: "12:00 PM - 3:00 PM",
            description: "Take a guided tour of Dharavi, one of Asia's largest slums and a hub of small industries."
          },
          evening: {
            activity: "Bandra-Worli Sea Link & Bandstand",
            time: "4:00 PM - 8:00 PM",
            description: "Drive across the Sea Link and visit Bandstand for celebrity homes and sea views."
          }
        }
      ];
      
      const delhiItinerary = [
        {
          day: 1,
          morning: {
            activity: "Red Fort & Jama Masjid",
            time: "9:00 AM - 12:00 PM",
            description: "Explore the historic Red Fort followed by a visit to Jama Masjid, India's largest mosque."
          },
          afternoon: {
            activity: "Chandni Chowk & Paranthe Wali Gali",
            time: "12:30 PM - 3:30 PM",
            description: "Shop at Chandni Chowk and enjoy traditional paranthas for lunch."
          },
          evening: {
            activity: "India Gate & Rashtrapati Bhavan",
            time: "4:30 PM - 7:30 PM",
            description: "Visit India Gate and drive past the Rashtrapati Bhavan and Parliament House."
          }
        },
        {
          day: 2,
          morning: {
            activity: "Qutub Minar & Humayun's Tomb",
            time: "9:00 AM - 12:30 PM",
            description: "Visit Qutub Minar, the tallest brick minaret in the world, and Humayun's Tomb."
          },
          afternoon: {
            activity: "Lotus Temple & ISKCON Temple",
            time: "1:30 PM - 4:30 PM",
            description: "Experience the serenity of Lotus Temple and the spirituality of ISKCON Temple."
          },
          evening: {
            activity: "Connaught Place & Janpath Market",
            time: "5:00 PM - 8:00 PM",
            description: "Shop at Connaught Place and Janpath Market, followed by dinner at a local restaurant."
          }
        },
        {
          day: 3,
          morning: {
            activity: "Akshardham Temple",
            time: "8:00 AM - 11:00 AM",
            description: "Visit the magnificent Akshardham Temple, a spiritual-cultural complex."
          },
          afternoon: {
            activity: "National Museum & Gandhi Smriti",
            time: "12:00 PM - 3:00 PM",
            description: "Explore the National Museum and Gandhi Smriti, where Mahatma Gandhi spent his last days."
          },
          evening: {
            activity: "Hauz Khas Village",
            time: "4:00 PM - 8:00 PM",
            description: "Experience the vibrant Hauz Khas Village with its cafes, boutiques, and ancient ruins."
          }
        }
      ];
      
      // Default itinerary for other destinations
      const defaultItinerary = [
        {
          day: 1,
          morning: {
            activity: "Local Sightseeing",
            time: "9:00 AM - 12:00 PM",
            description: "Visit the main attractions and landmarks in the city center."
          },
          afternoon: {
            activity: "Local Cuisine Experience",
            time: "12:30 PM - 3:30 PM",
            description: "Try local dishes at famous eateries around the city."
          },
          evening: {
            activity: "Sunset Spot & Night Market",
            time: "4:30 PM - 8:00 PM",
            description: "Enjoy sunset at a scenic viewpoint and explore the night market."
          }
        },
        {
          day: 2,
          morning: {
            activity: "Heritage & Cultural Sites",
            time: "9:00 AM - 12:30 PM",
            description: "Visit museums, temples, and historical buildings."
          },
          afternoon: {
            activity: "Shopping & Local Crafts",
            time: "1:30 PM - 4:30 PM",
            description: "Explore local markets for souvenirs and handicrafts."
          },
          evening: {
            activity: "Entertainment & Dining",
            time: "5:00 PM - 8:00 PM",
            description: "Experience local entertainment and dining options."
          }
        },
        {
          day: 3,
          morning: {
            activity: "Nature Excursion",
            time: "8:00 AM - 12:00 PM",
            description: "Visit nearby parks, gardens or natural attractions."
          },
          afternoon: {
            activity: "Modern Attractions",
            time: "1:00 PM - 4:00 PM",
            description: "Experience contemporary landmarks and attractions."
          },
          evening: {
            activity: "Farewell Dinner",
            time: "5:00 PM - 8:00 PM",
            description: "Enjoy a special dinner at a popular restaurant."
          }
        }
      ];

      // Short version of default itinerary
      const shortDefaultItinerary = [
        {
          day: 1,
          morning: {
            activity: "Must-See Main Attractions",
            time: "8:00 AM - 11:00 AM",
            description: "Visit the top-rated attractions in the city center.",
            mustVisit: true
          },
          afternoon: {
            activity: "Local Cuisine Experience",
            time: "12:00 PM - 3:00 PM",
            description: "Try local dishes at famous eateries around the city.",
            mustVisit: false
          },
          evening: {
            activity: "Sunset Viewpoint",
            time: "4:00 PM - 7:00 PM",
            description: "Enjoy sunset at the best viewpoint and try street food.",
            mustVisit: true
          },
          quickTips: [
            { icon: <Hotel className="h-3 w-3" />, text: "Stay in the city center for convenience" },
            { icon: <Utensils className="h-3 w-3" />, text: "Try the local specialty dishes" },
            { icon: <Star className="h-3 w-3" />, text: "Book a guided walking tour for efficiency" }
          ]
        },
        {
          day: 2,
          morning: {
            activity: "Cultural & Heritage Site",
            time: "9:00 AM - 12:00 PM",
            description: "Visit the most important cultural or historical site.",
            mustVisit: true
          },
          afternoon: {
            activity: "Souvenir Shopping",
            time: "1:00 PM - 3:00 PM",
            description: "Quick shopping at the best local market for souvenirs.",
            mustVisit: false
          },
          evening: {
            activity: "Departure Preparations",
            time: "4:00 PM - 7:00 PM",
            description: "Final sightseeing and preparation for departure.",
            mustVisit: false
          },
          quickTips: [
            { icon: <Clock className="h-3 w-3" />, text: "Visit heritage sites early to avoid crowds" },
            { icon: <Utensils className="h-3 w-3" />, text: "Pack some local snacks for your journey" },
            { icon: <Star className="h-3 w-3" />, text: "Take photos at sunset for the best lighting" }
          ]
        }
      ];
      
      // Select the appropriate itinerary based on destination and plan type
      let selectedItinerary;
      
      if (planType === 'short') {
        if (destination.toLowerCase().includes('mumbai')) {
          selectedItinerary = shortMumbaiItinerary;
        } else if (destination.toLowerCase().includes('delhi')) {
          selectedItinerary = shortDelhiItinerary;
        } else {
          selectedItinerary = shortDefaultItinerary;
        }
      } else {
        if (destination.toLowerCase().includes('mumbai')) {
          selectedItinerary = mumbaiItinerary;
        } else if (destination.toLowerCase().includes('delhi')) {
          selectedItinerary = delhiItinerary;
        } else {
          selectedItinerary = defaultItinerary;
        }
      }
      
      // Limit the itinerary based on selected days
      const maxDays = planType === 'short' ? 2 : 3;
      setItinerary(selectedItinerary.slice(0, Math.min(days, maxDays)));
      setLoading(false);
    };
    
    generateItinerary();
  }, [destination, days, planType]);
  
  const handleViewOnMap = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`, '_blank');
  };
  
  const handleChangeDays = (newDays: number) => {
    setDays(newDays);
  };

  const handleChangePlanType = (type: 'short' | 'detailed') => {
    setPlanType(type);
    if (type === 'short') {
      // For short plans, limit to max 2 days
      setDays(Math.min(days, 2));
    }
  };
  
  if (loading) {
    return <div>Loading itinerary...</div>;
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-yatri-blue" />
            <span>AI-Generated Itinerary for {destination}</span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="detailed" onValueChange={(value) => handleChangePlanType(value as 'short' | 'detailed')}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="short" className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Short Plan (1-2 days)
            </TabsTrigger>
            <TabsTrigger value="detailed" className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Detailed Plan
            </TabsTrigger>
          </TabsList>
          
          <div className="flex justify-between items-center mb-4">
            <div className="space-x-1">
              {planType === 'short' ? (
                <>
                  <Button 
                    variant={days === 1 ? "secondary" : "outline"} 
                    size="sm" 
                    onClick={() => handleChangeDays(1)}
                  >
                    1 Day
                  </Button>
                  <Button 
                    variant={days === 2 ? "secondary" : "outline"} 
                    size="sm" 
                    onClick={() => handleChangeDays(2)}
                  >
                    2 Days
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant={days === 1 ? "secondary" : "outline"} 
                    size="sm" 
                    onClick={() => handleChangeDays(1)}
                  >
                    1 Day
                  </Button>
                  <Button 
                    variant={days === 2 ? "secondary" : "outline"} 
                    size="sm" 
                    onClick={() => handleChangeDays(2)}
                  >
                    2 Days
                  </Button>
                  <Button 
                    variant={days === 3 ? "secondary" : "outline"} 
                    size="sm" 
                    onClick={() => handleChangeDays(3)}
                  >
                    3 Days
                  </Button>
                </>
              )}
            </div>
            
            <Button variant="outline" onClick={handleViewOnMap} className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              View on Map
            </Button>
          </div>
          
          <div className="space-y-6">
            {planType === 'short' && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-medium mb-2 flex items-center text-yatri-blue">
                  <Star className="w-4 h-4 mr-1" />
                  Quick Trip Highlights
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  This itinerary focuses on must-see attractions that can be visited in a short time.
                  Perfect for weekend trips or quick stopovers in {destination}.
                </p>
              </div>
            )}
            
            {itinerary.map((day) => (
              <div key={day.day} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-yatri-blue mb-3">Day {day.day}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                        <Coffee className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium">{day.morning.activity}</h4>
                        <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {day.morning.time}
                        </span>
                        {planType === 'short' && day.morning.mustVisit && (
                          <Badge className="text-xs bg-yatri-orange">Must Visit</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {day.morning.description}
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full">
                        <Sun className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium">{day.afternoon.activity}</h4>
                        <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {day.afternoon.time}
                        </span>
                        {planType === 'short' && day.afternoon.mustVisit && (
                          <Badge className="text-xs bg-yatri-orange">Must Visit</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {day.afternoon.description}
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                        <Moon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium">{day.evening.activity}</h4>
                        <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {day.evening.time}
                        </span>
                        {planType === 'short' && day.evening.mustVisit && (
                          <Badge className="text-xs bg-yatri-orange">Must Visit</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {day.evening.description}
                      </p>
                    </div>
                  </div>
                  
                  {planType === 'short' && day.quickTips && (
                    <>
                      <Separator />
                      <div className="bg-gray-100 dark:bg-gray-600/30 p-3 rounded-lg">
                        <h4 className="text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">QUICK TIPS FOR DAY {day.day}</h4>
                        <div className="space-y-2">
                          {day.quickTips.map((tip, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="bg-yatri-blue/10 p-1 rounded-full">
                                {tip.icon}
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-300">{tip.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            <p>* This is an AI-generated itinerary. Times and activities may need adjustment based on personal preferences and local conditions.</p>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SampleItinerary;
        