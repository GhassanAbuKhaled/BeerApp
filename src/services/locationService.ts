import { fetchLocationDetails } from "@/api/locationApi";
import { weatherAndLocationStore } from "@/store/weatherAndLocation";

let latitude: number | null = null;
let longitude: number | null = null;
let error: string | null = null;

/**
 * Retrieves the location details based on the current latitude and longitude.
 * @returns {Promise<WeatherAndLocationData | null>} - The country and city of the current location.
 */
const getLocation = async (): Promise<WeatherAndLocationData | null> => {
  try {
    // Get the latitude and longitude coordinates
    await getLatitudeAndLongitude();

    if (latitude !== null && longitude !== null) {
      // Fetch location details using the coordinates
      const response = await fetchLocationDetails(latitude, longitude);

      const country = response.sys.country;
      const city = response.name;
      const temperature = response.main.temp;

      // Store this data in the Pinia store
      weatherAndLocationStore().setData({ country, city, temperature });
      return { country, city, temperature };
    } else {
      throw new Error("Failed to retrieve coordinates.");
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};

/**
 * Retrieves the current latitude and longitude using the Geolocation API.
 * @returns {Promise<void>}
 */
const getLatitudeAndLongitude = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Store the coordinates
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          resolve();
        },
        (err) => {
          handleError(err);
          reject(err);
        }
      );
    } else {
      error = "Geolocation is not supported by this browser.";
      reject(new Error(error));
    }
  });
};

/**
 * Handles errors from the Geolocation API.
 * @param {GeolocationPositionError} err - The error object from the Geolocation API.
 */
const handleError = (err: GeolocationPositionError) => {
  error = err.message || "An unknown error occurred.";
};

export default getLocation;
