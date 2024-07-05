import { mockBeerAppApi }  from "@/api/beerAppApi";
import { BEER_ENDPOINTS } from "@/api/endpoints";

// arguments for reply are (status, data, headers)
mockBeerAppApi.onGet(BEER_ENDPOINTS.GET_BEER_TYPES).reply<BeersResponse>(200, {
  beers: [
    { id: '1', name: "Augustiner Helles" },
    { id: '2', name: "Weihenstephaner Hefeweissbier" },
    { id: '3', name: "Paulaner Salvator" },
    { id: '4', name: "Ayinger Celebrator Doppelbock" },
    { id: '5', name: "Spaten Oktoberfest" },
    { id: '6', name: "Franziskaner Hefe-Weissbier" },
    { id: '7', name: "Bitburger Pils" },
    { id: '8', name: "Köstritzer Schwarzbier" },
    { id: '9', name: "Erdinger Weissbier" },
    { id: '10', name: "Hacker-Pschorr Münchner Gold" },
    { id: '11', name: "Warsteiner Premium Verum" },
    { id: '12', name: "Schneider Weisse Original" },
    { id: '13', name: "Veltins Pilsener" },
    { id: '14', name: "Berliner Kindl Weisse" },
    { id: '15', name: "Radeberger Pilsner" },
    { id: '16', name: "Tegernseer Hell" },
    { id: '17', name: "Beck's" },
    { id: '18', name: "Jever Pilsener" },
    { id: '19', name: "Würzburger Hofbräu" },
    { id: '20', name: "Gaffel Kölsch" },
  ],
});

export default mockBeerAppApi;
