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
  temperature: number;
}

interface InputRecord {
  [key: string]: any;
}

interface ReviewData {
  Hoppiness: number;
  Maltiness: number;
  Overall: number;
  beerType: string;
  city: string;
  country: string;
  temperature: number;
  temperatureUnit: string;
  termsCheckbox: string;
}
