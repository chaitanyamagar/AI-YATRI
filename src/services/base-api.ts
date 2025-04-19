import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from '@/hooks/use-toast';

class BaseApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // You can add auth token here if needed
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle common errors
        if (error.response) {
          switch (error.response.status) {
            case 401:
              toast({
                title: "Authentication Error",
                description: "Please log in again.",
                variant: "destructive",
              });
              break;
            case 403:
              toast({
                title: "Access Denied",
                description: "You don't have permission to perform this action.",
                variant: "destructive",
              });
              break;
            case 404:
              toast({
                title: "Not Found",
                description: "The requested resource was not found.",
                variant: "destructive",
              });
              break;
            case 500:
              toast({
                title: "Server Error",
                description: "Something went wrong on our end. Please try again later.",
                variant: "destructive",
              });
              break;
            default:
              toast({
                title: "Error",
                description: error.response.data.message || "An error occurred.",
                variant: "destructive",
              });
          }
        } else if (error.request) {
          toast({
            title: "Network Error",
            description: "Please check your internet connection.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "An unexpected error occurred.",
            variant: "destructive",
          });
        }
        return Promise.reject(error);
      }
    );
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
    return response.data;
  }

  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
    return response.data;
  }

  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
    return response.data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
    return response.data;
  }
}

export default BaseApiService; 