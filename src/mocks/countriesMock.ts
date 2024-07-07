import { mockBeerAppApi } from "@/api/beerAppApi";
import { COUNTRIES_ENDPOINTS } from "@/api/endpoints";

mockBeerAppApi
  .onGet(COUNTRIES_ENDPOINTS.GET_COUNTRIES_LIST)
  .reply<countriesResponse>(200, {
    countries: {
      AF: { name: "Afghanistan", flag: "🇦🇫" },
      AL: { name: "Albania", flag: "🇦🇱" },
      DZ: { name: "Algeria", flag: "🇩🇿" },
      AD: { name: "Andorra", flag: "🇦🇩" },
      AO: { name: "Angola", flag: "🇦🇴" },
      AG: { name: "Antigua and Barbuda", flag: "🇦🇬" },
      AR: { name: "Argentina", flag: "🇦🇷" },
      AM: { name: "Armenia", flag: "🇦🇲" },
      AU: { name: "Australia", flag: "🇦🇺" },
      AT: { name: "Austria", flag: "🇦🇹" },
      AZ: { name: "Azerbaijan", flag: "🇦🇿" },
      BS: { name: "Bahamas", flag: "🇧🇸" },
      BH: { name: "Bahrain", flag: "🇧🇭" },
      BD: { name: "Bangladesh", flag: "🇧🇩" },
      BB: { name: "Barbados", flag: "🇧🇧" },
      BY: { name: "Belarus", flag: "🇧🇾" },
      BE: { name: "Belgium", flag: "🇧🇪" },
      BZ: { name: "Belize", flag: "🇧🇿" },
      BJ: { name: "Benin", flag: "🇧🇯" },
      BT: { name: "Bhutan", flag: "🇧🇹" },
      CZ: { name: "Czech Republic", flag: "🇨🇿" },
      DK: { name: "Denmark", flag: "🇩🇰" },
      DJ: { name: "Djibouti", flag: "🇩🇯" },
      DM: { name: "Dominica", flag: "🇩🇲" },
      DO: { name: "Dominican Republic", flag: "🇩🇴" },
      EC: { name: "Ecuador", flag: "🇪🇨" },
      EG: { name: "Egypt", flag: "🇪🇬" },
      SV: { name: "El Salvador", flag: "🇸🇻" },
      GQ: { name: "Equatorial Guinea", flag: "🇬🇶" },
      ER: { name: "Eritrea", flag: "🇪🇷" },
      EE: { name: "Estonia", flag: "🇪🇪" },
      ET: { name: "Ethiopia", flag: "🇪🇹" },
      FJ: { name: "Fiji", flag: "🇫🇯" },
      FI: { name: "Finland", flag: "🇫🇮" },
      FR: { name: "France", flag: "🇫🇷" },
      GA: { name: "Gabon", flag: "🇬🇦" },
      GM: { name: "Gambia", flag: "🇬🇲" },
      GE: { name: "Georgia", flag: "🇬🇪" },
      DE: { name: "Germany", flag: "🇩🇪" },
      GH: { name: "Ghana", flag: "🇬🇭" },
      GR: { name: "Greece", flag: "🇬🇷" },
      GD: { name: "Grenada", flag: "🇬🇩" },
      GT: { name: "Guatemala", flag: "🇬🇹" },
      GN: { name: "Guinea", flag: "🇬🇳" },
    }    
  });

export default mockBeerAppApi;
