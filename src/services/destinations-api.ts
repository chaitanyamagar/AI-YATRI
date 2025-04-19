import BaseApiService from './base-api';
import { API_CONFIG } from '@/config/api-config';

interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  fallbackImage: string;
  rating: number;
  attractions: string[];
  bestTime: string;
}

interface DestinationsResponse {
  data: Destination[];
  total: number;
}

class DestinationsApiService extends BaseApiService {
  constructor() {
    super(API_CONFIG.BASE_URLS.RAPID_API, API_CONFIG.HEADERS.RAPID_API);
  }

  async getDestinations(query: string = ''): Promise<DestinationsResponse> {
    return this.get<DestinationsResponse>(API_CONFIG.ENDPOINTS.DESTINATIONS, {
      params: {
        query,
        limit: 20
      }
    });
  }

  async getDestinationById(id: number): Promise<Destination> {
    return this.get<Destination>(`${API_CONFIG.ENDPOINTS.DESTINATIONS}/${id}`);
  }

  async getAttractionsByDestination(destinationId: number): Promise<any> {
    return this.get(`${API_CONFIG.ENDPOINTS.ATTRACTIONS}`, {
      params: {
        location_id: destinationId
      }
    });
  }
}

export const destinationsApi = new DestinationsApiService();