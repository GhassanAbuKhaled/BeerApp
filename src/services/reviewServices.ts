import { BEER_ENDPOINTS, REVIEW_ENDPOINTS } from "@/api/endpoints";
import beerAppApi from "@/api/beerAppApi";
// import mockBeerAppApi from "@/mocks/reviewsMock";

// Activate the mock adapter for reviews
// mockBeerAppApi.adapter();
/**
 * Retrieves the list of available beer types.
 * @returns {Promise<BeersResponse>} A promise resolving to an array of beer types.
 */
export const getBeerTypes = async (): Promise<BeersResponse> => {
  try {
    const response = await beerAppApi.get(
      BEER_ENDPOINTS.GET_BEER_TYPES
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Saves a review.
 * @param {ReviewData} review The review data to be saved.
 * @returns {Promise<{message: string} | null>} A promise resolving to a confirmation message.
 */
export const saveReview = async (review: ReviewData): Promise<{message: string} > => {
  try {
    const response = await beerAppApi.post(REVIEW_ENDPOINTS.SAVE_REVIEW, review);
    return response.data // Assuming backend sends a string confirmation message
  } catch (error) {
    throw error;
  }
};
