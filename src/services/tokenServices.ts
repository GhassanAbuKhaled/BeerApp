import { TOKEN_ENDPOINTS } from "@/api/endpoints";
import beerAppApi from "@/api/beerAppApi";
import mockBeerAppApi from "@/mocks/tokenMocks";

// Activate the mock adapter for reviews
mockBeerAppApi.adapter();
/**
 * Retrieves the CSRF token from the server.
 * @returns {Promise<{ csrfToken: string }>} A promise resolving to the CSRF token object.
 */
export const getCsrfToken = async (): Promise<{ csrfToken: string }> => {
  try {
    const response = await beerAppApi.get(
      TOKEN_ENDPOINTS.CSRF_TOKEN
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getCsrfToken;
