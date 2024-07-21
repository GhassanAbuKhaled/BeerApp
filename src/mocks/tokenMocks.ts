// import { TOKEN_ENDPOINTS } from "@/api/endpoints";
// import { mockBeerAppApi } from "@/api/beerAppApi";

// // Function to create a random token
// const createRandomToken = (length: number = 32): string => {
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
// };

// // Mocking the CSRF token endpoint
// mockBeerAppApi.onGet(TOKEN_ENDPOINTS.CSRF_TOKEN)
//   .reply(200, { csrfToken: createRandomToken() });


// export default mockBeerAppApi 