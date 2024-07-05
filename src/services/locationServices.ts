import locationApi from "@/api/locationApi";
import { LOCATIONS_ENDPOINTS } from "@/api/endpoints";

let latitude: number | null = null;
let longitude: number | null = null;
/**
 * Retrieves the location details based on the current latitude and longitude.
 * @returns {Promise<WeatherAndLocationData | null>} - The country, city and temperature of the current location or null if there's an error.
 */
const getLocation = async (): Promise<WeatherAndLocationData | null> => {
  try {
    await getLatitudeAndLongitude();

    if (latitude !== null && longitude !== null) {
      const response = await locationApi.get(
        LOCATIONS_ENDPOINTS.GET_LOCATION_AND_WEATHER(latitude, longitude)
      );

      const data: WeatherAndLocationData = {
        country: response.data.sys.country,
        city: response.data.name,
        temperature: Math.ceil(response.data.main.temp),
      };

      return data;
    } else {
      throw new Error("Failed to retrieve coordinates.");
    }
  } catch (err) {
    console.error("Error fetching location:", err);
    return null
  }
};

// Retrieves the current latitude and longitude using the Geolocation API.
const getLatitudeAndLongitude = (): Promise<void> =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lon } }) => {
          latitude = lat;
          longitude = lon;
          resolve();
        },
        (err) => reject(new Error(err.message || "An unknown error occurred."))
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });

export default getLocation;