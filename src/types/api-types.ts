// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// API Error Types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// API Request Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
  query?: string;
  filters?: Record<string, any>;
}

// Common Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Destination Types
export interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
  fallbackImage: string;
  rating: number;
  attractions: string[];
  bestTime: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  weather?: {
    temperature: number;
    condition: string;
    humidity: number;
  };
}

// Booking Types
export interface Booking {
  id: string;
  destinationId: number;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
} 