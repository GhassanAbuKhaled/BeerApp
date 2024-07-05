import { mockBeerAppApi } from "@/api/beerAppApi";
import { COUNTRIES_ENDPOINTS } from "@/api/endpoints";

mockBeerAppApi
  .onGet(COUNTRIES_ENDPOINTS.GET_COUNTRIES_LIST)
  .reply<countriesResponse>(200, {
    countries: [
      { id: "1", name: "Germany", flag: "🇩🇪" },
      { id: "2", name: "United States", flag: "🇺🇸" },
      { id: "3", name: "France", flag: "🇫🇷" },
      { id: "4", name: "United Kingdom", flag: "🇬🇧" },
      { id: "5", name: "Italy", flag: "🇮🇹" },
      { id: "6", name: "Spain", flag: "🇪🇸" },
      { id: "7", name: "Canada", flag: "🇨🇦" },
      { id: "8", name: "Australia", flag: "🇦🇺" },
      { id: "9", name: "Japan", flag: "🇯🇵" },
      { id: "10", name: "Brazil", flag: "🇧🇷" },
      { id: "11", name: "China", flag: "🇨🇳" },
      { id: "12", name: "India", flag: "🇮🇳" },
      { id: "13", name: "South Africa", flag: "🇿🇦" },
      { id: "14", name: "Russia", flag: "🇷🇺" },
      { id: "15", name: "Mexico", flag: "🇲🇽" },
      { id: "16", name: "Argentina", flag: "🇦🇷" },
      { id: "17", name: "Netherlands", flag: "🇳🇱" },
      { id: "18", name: "Sweden", flag: "🇸🇪" },
      { id: "19", name: "Switzerland", flag: "🇨🇭" },
      { id: "20", name: "Norway", flag: "🇳🇴" },
    ],
    
  });

export default mockBeerAppApi;
