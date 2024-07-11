import { COUNTRIES_ENDPOINTS } from "@/api/endpoints";
import beerAppApi from "@/api/beerAppApi";
import mockBeerAppApi from "@/mocks/countriesMock";

// Activate the mock adapter for countries
mockBeerAppApi.adapter()
/**
 * Retrieves the list of countries.
 * @returns {Promise<countriesResponse | null>} A promise resolving to an array of countries or null if there's an error.
 */
export const getCountriesList = async (): Promise<countriesResponse> => {
  try {
    const response = await beerAppApi.get(
      COUNTRIES_ENDPOINTS.GET_COUNTRIES_LIST
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getCountriesList;
