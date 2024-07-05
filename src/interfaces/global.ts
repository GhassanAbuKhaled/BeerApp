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
  id: string;
  name: string;
  flag: string;
}
interface countriesResponse {
  countries: Country[];
}

// Interface for the location details
interface WeatherAndLocationData {
  country: string;
  city: string;
  temperature: number;
}
