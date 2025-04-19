/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AMADEUS_API_KEY: string
  readonly VITE_WEATHER_API_KEY: string
  readonly VITE_MAPS_API_KEY: string
  readonly VITE_RAPID_API_KEY: string
  readonly VITE_GEMINI_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 