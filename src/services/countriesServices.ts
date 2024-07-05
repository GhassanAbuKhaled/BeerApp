import { COUNTRIES_ENDPOINTS } from "@/api/endpoints";
import beerAppApi from "@/api/beerAppApi";
import { AxiosResponse } from "axios";
// import countriesMock from "@/mocks/countriesMock";
import mockBeerAppApi from "@/mocks/countriesMock";
// Activate the mock adapter for countries
mockBeerAppApi.adapter()
/**
 * Retrieves the list of countries.
 * @returns {Promise<countriesResponse | null>} A promise resolving to an array of countries or null if there's an error.
 */
export const getCountriesList = async (): Promise<countriesResponse | null> => {
  try {
    const response: AxiosResponse<countriesResponse> = await beerAppApi.get(
      COUNTRIES_ENDPOINTS.GET_COUNTRIES_LIST
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch countries list", error);
    return null;
  }
};

export default getCountriesList;
