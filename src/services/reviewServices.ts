import { BEER_ENDPOINTS } from "@/api/endpoints";
import beerAppApi from "@/api/beerAppApi";
import { AxiosResponse } from "axios";
import mockBeerAppApi from "@/mocks/reviewsMock";

// Activate the mock adapter for reviews
mockBeerAppApi.adapter();

/**
 * Retrieves the list of available beer types.
 * @returns {Promise<BeersResponse | null>} A promise resolving to an array of beer types or null if there's an error.
 */
export const getBeerTypes = async (): Promise<BeersResponse | null> => {
  try {
    const response: AxiosResponse<BeersResponse> = await beerAppApi.get(
      BEER_ENDPOINTS.GET_BEER_TYPES
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch beer types", error);
    return null;
  }
};

export default getBeerTypes;
