
import React, { useState, useEffect } from 'react';
import { Loader2, Download, Copy, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import MapView from './MapView';

interface ItineraryDisplayProps {
  itinerary: string | null;
}

const ItineraryDisplay = ({ itinerary }: ItineraryDisplayProps) => {
  const [loading, setLoading] = useState(false);
  const [attractions, setAttractions] = useState<string[]>([]);
  const [destination, setDestination] = useState<string>('');

  useEffect(() => {
    if (itinerary) {
      // Extract destination from itinerary
      const destinationMatch = itinerary.match(/\*\*Destination:\*\* ([^\n]+)/);
      if (destinationMatch && destinationMatch[1]) {
        setDestination(destinationMatch[1]);
      }
      
      // Extract attractions from itinerary
      const attractionsSection = itinerary.match(/## Must-Visit Attractions\n([\s\S]*?)(\n##|$)/);
      if (attractionsSection && attractionsSection[1]) {
        const extractedAttractions = attractionsSection[1]
          .split('\n')
          .filter(line => line.startsWith('- '))
          .map(line => line.replace('- ', ''))
          .filter(Boolean);
        
        setAttractions(extractedAttractions);
      }
    }
  }, [itinerary]);

  const handleDownload = () => {
    if (!itinerary) return;
    
    const element = document.createElement('a');
    const file = new Blob([itinerary], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Itinerary-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Itinerary downloaded",
      description: "Your itinerary has been downloaded as a Markdown file.",
    });
  };

  const handleCopy = () => {
    if (!itinerary) return;
    
    navigator.clipboard.writeText(itinerary);
    
    toast({
      title: "Copied to clipboard",
      description: "Your itinerary has been copied to your clipboard.",
    });
  };

  const convertToHtml = (markdown: string) => {
    // Very basic markdown to HTML conversion
    let html = markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-5 mb-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^\- (.*$)/gm, '<li class="ml-4">$1</li>');
    
    // Convert consecutive list items to ul
    html = html.replace(/<li class="ml-4">(.*?)<\/li>(\s*<li class="ml-4">.*?<\/li>)+/g, function(match) {
      return '<ul class="list-disc my-2 ml-5">' + match + '</ul>';
    });
    
    // Convert new lines to paragraphs (excluding inside headers, lists)
    html = html.replace(/^([^<].*[^>])$/gm, '<p class="mb-2">$1</p>');
    
    return html;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-display font-semibold mb-6 dark:text-white">
        Your AI-Generated Itinerary
      </h2>
      
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-yatri-blue" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">
            Generating your personalized itinerary...
          </span>
        </div>
      ) : itinerary ? (
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleDownload}
              className="flex items-center"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleCopy}
              className="flex items-center"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>
          
          {destination && (
            <MapView 
              destination={destination}
              attractions={attractions}
            />
          )}
          
          <div 
            className="prose prose-yatri dark:prose-invert max-w-none mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 overflow-auto max-h-[600px]"
            dangerouslySetInnerHTML={{ __html: convertToHtml(itinerary) }}
          ></div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">No Itinerary Generated Yet</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Fill out the form to get a personalized AI travel plan with interactive maps.
          </p>
        </div>
      )}
    </div>
  );
};

export default ItineraryDisplay;
