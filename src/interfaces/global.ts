// Beer interface
interface Beers {
  id: string;
  name: string;
}
interface BeersResponse {
  beers: Beers[];
}

// Country interface with flag emoji
interface Country {
  name: string;
  flag: string;
}
interface countriesResponse {
  countries: {
    [key: string]: Country
  };
}

// Interface for the location details
interface WeatherAndLocationData {
  country: string;
  city: string;
  temperature: number | null;
}

interface InputRecord {
  [key: string]: any;
}


interface ReviewData {
  hoppinessRating: number;
  overallRating: number;
  maltinessRating: number;
  termsWasAccepted: boolean;
  countryName: string;
  cityName: string;
  beerType: string;
  comment: string;
  temperatureUnit: 'C' | 'F';
  temperature: number;
}
