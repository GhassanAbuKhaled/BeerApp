interface Beer {
  id: string;           // Unique identifier
  name: string;         // Beer name
}

interface BeersResponse {
  beers: Beer[];        // List of beers
}

interface CountriesList {
  [key: string]: string;   // Country code to country name mapping
}

interface WeatherAndLocationData {
  countryCode: string;      // Country code
  city: string;             // City name
  temperature: number | null;  // Temperature in Celsius or Fahrenheit, null if unknown
}

interface InputRecord {
  [key: string]: any;   // Generic key-value pairs
}

interface ReviewData {
  hoppinessRating: number;      // Hoppiness rating
  overallRating: number;        // Overall rating
  maltinessRating: number;      // Maltiness rating
  termsWasAccepted: boolean;    // Whether terms were accepted
  countryName: string;          // Country name
  cityName: string;             // City name
  beerType: string;             // Beer type
  comment: string;              // Review comment
  temperatureUnit: 'C' | 'F';   // Temperature unit
  temperature: number;          // Temperature value
  _csrfToken: string;           // CSRF token
}

interface ToastOptions {
  message: string;         // Toast message
  duration?: number;       // Optional duration
  type?: string;           // Optional type (e.g., success, error)
}

interface SyncManager {
  getTags(): Promise<string[]>;     // Fetch tags
  register(tag: string): Promise<void>;   // Register a new tag
}

interface ServiceWorkerRegistration {
  readonly sync: SyncManager;   // Sync manager
}

interface SyncEvent extends ExtendableEvent {
  readonly lastChance: boolean;   // Last chance sync flag
  readonly tag: string;           // Sync tag
}

interface ServiceWorkerGlobalScopeEventMap {
  sync: SyncEvent;    // Sync event
}
