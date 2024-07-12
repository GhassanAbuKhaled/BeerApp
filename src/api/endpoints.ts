const LOCATIONS_API_KEY = process.env.VUE_APP_OPEN_WEATHER_API_KEY;

export const LOCATIONS_ENDPOINTS = {
  GET_LOCATION_AND_WEATHER: (latitude: number, longitude: number) =>
    `/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${LOCATIONS_API_KEY}`,
};

export const REVIEW_ENDPOINTS = {
  SAVE_REVIEW: "/reviews/save",
};
export const TOKEN_ENDPOINTS = {
  CSRF_TOKEN: "/token/csrf-token",
};
export const BEER_ENDPOINTS = {
  GET_BEER_TYPES: "/beer/types",
};

