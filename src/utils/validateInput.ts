import { sanitize } from "dompurify";

// the List of countries
const countriesList: CountriesList =  
{
    AF: "Afghanistan 🇦🇫",
    AL: "Albania 🇦🇱",
    DZ: "Algeria 🇩🇿",
    AD: "Andorra 🇦🇩",
    AO: "Angola 🇦🇴",
    AG: "Antigua and Barbuda 🇦🇬",
    AR: "Argentina 🇦🇷",
    AM: "Armenia 🇦🇲",
    AU: "Australia 🇦🇺",
    AT: "Austria 🇦🇹",
    AZ: "Azerbaijan 🇦🇿",
    BS: "Bahamas 🇧🇸",
    BH: "Bahrain 🇧🇭",
    BD: "Bangladesh 🇧🇩",
    BB: "Barbados 🇧🇧",
    BY: "Belarus 🇧🇾",
    BE: "Belgium 🇧🇪",
    BZ: "Belize 🇧🇿",
    BJ: "Benin 🇧🇯",
    BT: "Bhutan 🇧🇹",
    BO: "Bolivia 🇧🇴",
    BA: "Bosnia and Herzegovina 🇧🇦",
    BW: "Botswana 🇧🇼",
    BR: "Brazil 🇧🇷",
    BN: "Brunei 🇧🇳",
    BG: "Bulgaria 🇧🇬",
    BF: "Burkina Faso 🇧🇫",
    BI: "Burundi 🇧🇮",
    CV: "Cabo Verde 🇨🇻",
    KH: "Cambodia 🇰🇭",
    CM: "Cameroon 🇨🇲",
    CA: "Canada 🇨🇦",
    CF: "Central African Republic 🇨🇫",
    TD: "Chad 🇹🇩",
    CL: "Chile 🇨🇱",
    CN: "China 🇨🇳",
    CO: "Colombia 🇨🇴",
    KM: "Comoros 🇰🇲",
    CG: "Congo 🇨🇬",
    CR: "Costa Rica 🇨🇷",
    HR: "Croatia 🇭🇷",
    CU: "Cuba 🇨🇺",
    CY: "Cyprus 🇨🇾",
    CZ: "Czech Republic 🇨🇿",
    DK: "Denmark 🇩🇰",
    DJ: "Djibouti 🇩🇯",
    DM: "Dominica 🇩🇲",
    DO: "Dominican Republic 🇩🇴",
    EC: "Ecuador 🇪🇨",
    EG: "Egypt 🇪🇬",
    SV: "El Salvador 🇸🇻",
    GQ: "Equatorial Guinea 🇬🇶",
    ER: "Eritrea 🇪🇷",
    EE: "Estonia 🇪🇪",
    ET: "Ethiopia 🇪🇹",
    FJ: "Fiji 🇫🇯",
    FI: "Finland 🇫🇮",
    FR: "France 🇫🇷",
    GA: "Gabon 🇬🇦",
    GM: "Gambia 🇬🇲",
    GE: "Georgia 🇬🇪",
    DE: "Germany 🇩🇪",
    GH: "Ghana 🇬🇭",
    GR: "Greece 🇬🇷",
    GD: "Grenada 🇬🇩",
    GT: "Guatemala 🇬🇹",
    GN: "Guinea 🇬🇳",
    GW: "Guinea-Bissau 🇬🇼",
    GY: "Guyana 🇬🇾",
    HT: "Haiti 🇭🇹",
    HN: "Honduras 🇭🇳",
    HU: "Hungary 🇭🇺",
    IS: "Iceland 🇮🇸",
    IN: "India 🇮🇳",
    ID: "Indonesia 🇮🇩",
    IR: "Iran 🇮🇷",
    IQ: "Iraq 🇮🇶",
    IE: "Ireland 🇮🇪",
    IL: "Israel 🇮🇱",
    IT: "Italy 🇮🇹",
    JM: "Jamaica 🇯🇲",
    JP: "Japan 🇯🇵",
    JO: "Jordan 🇯🇴",
    KZ: "Kazakhstan 🇰🇿",
    KE: "Kenya 🇰🇪",
    KI: "Kiribati 🇰🇮",
    KP: "North Korea 🇰🇵",
    KR: "South Korea 🇰🇷",
    KW: "Kuwait 🇰🇼",
    KG: "Kyrgyzstan 🇰🇬",
    LA: "Laos 🇱🇦",
    LV: "Latvia 🇱🇻",
    LB: "Lebanon 🇱🇧",
    LS: "Lesotho 🇱🇸",
    LR: "Liberia 🇱🇷",
    LY: "Libya 🇱🇾",
    LI: "Liechtenstein 🇱🇮",
    LT: "Lithuania 🇱🇹",
    LU: "Luxembourg 🇱🇺",
    MG: "Madagascar 🇲🇬",
    MW: "Malawi 🇲🇼",
    MY: "Malaysia 🇲🇾",
    MV: "Maldives 🇲🇻",
    ML: "Mali 🇲🇱",
    MT: "Malta 🇲🇹",
    MH: "Marshall Islands 🇲🇭",
    MR: "Mauritania 🇲🇷",
    MU: "Mauritius 🇲🇺",
    MX: "Mexico 🇲🇽",
    FM: "Micronesia 🇫🇲",
    MD: "Moldova 🇲🇩",
    MC: "Monaco 🇲🇨",
    MN: "Mongolia 🇲🇳",
    ME: "Montenegro 🇲🇪",
    MA: "Morocco 🇲🇦",
    MZ: "Mozambique 🇲🇿",
    MM: "Myanmar 🇲🇲",
    NA: "Namibia 🇳🇦",
    NR: "Nauru 🇳🇷",
    NP: "Nepal 🇳🇵",
    NL: "Netherlands 🇳🇱",
    NZ: "New Zealand 🇳🇿",
    NI: "Nicaragua 🇳🇮",
    NE: "Niger 🇳🇪",
    NG: "Nigeria 🇳🇬",
    NO: "Norway 🇳🇴",
    OM: "Oman 🇴🇲",
    PK: "Pakistan 🇵🇰",
    PW: "Palau 🇵🇼",
    PA: "Panama 🇵🇦",
    PG: "Papua New Guinea 🇵🇬",
    PY: "Paraguay 🇵🇾",
    PE: "Peru 🇵🇪",
    PH: "Philippines 🇵🇭",
    PL: "Poland 🇵🇱",
    PT: "Portugal 🇵🇹",
    QA: "Qatar 🇶🇦",
    RO: "Romania 🇷🇴",
    RU: "Russia 🇷🇺",
    RW: "Rwanda 🇷🇼",
    KN: "Saint Kitts and Nevis 🇰🇳",
    LC: "Saint Lucia 🇱🇨",
    VC: "Saint Vincent and the Grenadines 🇻🇨",
    WS: "Samoa 🇼🇸",
    SM: "San Marino 🇸🇲",
    ST: "Sao Tome and Principe 🇸🇹",
    SA: "Saudi Arabia 🇸🇦",
    SN: "Senegal 🇸🇳",
    RS: "Serbia 🇷🇸",
    SC: "Seychelles 🇸🇨",
    SL: "Sierra Leone 🇸🇱",
    SG: "Singapore 🇸🇬",
    SK: "Slovakia 🇸🇰",
    SI: "Slovenia 🇸🇮",
    SB: "Solomon Islands 🇸🇧",
    SO: "Somalia 🇸🇴",
    ZA: "South Africa 🇿🇦",
    SS: "South Sudan 🇸🇸",
    ES: "Spain 🇪🇸",
    LK: "Sri Lanka 🇱🇰",
    SD: "Sudan 🇸🇩",
    SR: "Suriname 🇸🇷",
    SE: "Sweden 🇸🇪",
    CH: "Switzerland 🇨🇭",
    SY: "Syria 🇸🇾",
    TW: "Taiwan 🇹🇼",
    TJ: "Tajikistan 🇹🇯",
    TZ: "Tanzania 🇹🇿",
    TH: "Thailand 🇹🇭",
    TL: "Timor-Leste 🇹🇱",
    TG: "Togo 🇹🇬",
    TO: "Tonga 🇹🇴",
    TT: "Trinidad and Tobago 🇹🇹",
    TN: "Tunisia 🇹🇳",
    TR: "Turkey 🇹🇷",
    TM: "Turkmenistan 🇹🇲",
    TV: "Tuvalu 🇹🇻",
    UG: "Uganda 🇺🇬",
    UA: "Ukraine 🇺🇦",
    AE: "United Arab Emirates 🇦🇪",
    GB: "United Kingdom 🇬🇧",
    US: "United States 🇺🇸",
    UY: "Uruguay 🇺🇾",
    UZ: "Uzbekistan 🇺🇿",
    VU: "Vanuatu 🇻🇺",
    VA: "Vatican City 🇻🇦",
    VE: "Venezuela 🇻🇪",
    VN: "Vietnam 🇻🇳",
    YE: "Yemen 🇾🇪",
    ZM: "Zambia 🇿🇲",
    ZW: "Zimbabwe 🇿🇼"
};


// Type definition for validation rules
type ValidationRule = {
    regex: RegExp; 
    minLength: number; 
    maxLength: number;
};

// Type definition for the validation configuration, mapping field names to their corresponding validation rules
type ValidationConfig = {
    [key: string]: ValidationRule;
};

// Validation configuration object specifying rules for various input fields
const validationConfig: ValidationConfig = {
    city: {
        regex: /^(?!.*\s{3})(?!.*\b\w{13,}\b)[\p{L}\p{M}\s\-'éèêëàáâäãåçìíîïòóôöùúûüÿýæœ.,&]+$/u,
        minLength: 2,
        maxLength: 20,
    },
    beer: {
        regex: /^(?!.*\s{3})(?!.*\b\w{25,}\b)[\p{L}\p{M}0-9\s\-'éèêëàáâäãåçìíîïòóôöùúûüÿýæœ.,&]+$/u,
        minLength: 2,
        maxLength: 50,
    },
};


// Validates the length of the input string.
const validateLength = (input: string, minLength: number, maxLength: number): boolean => {
    const trimmedInput = input.trim(); // Remove leading and trailing whitespace
    return trimmedInput.length >= minLength && trimmedInput.length <= maxLength; // Check if length is within the allowed range
};


// Validates an input string against a given validation rule.
const validateInput = (input: string, rule: ValidationRule): boolean => {
    if (rule) {   
        // Validate the input using the regex and length constraints
        return rule.regex.test(input) && validateLength(input, rule.minLength, rule.maxLength);
    }
    return false; // Return false if no rule is provided
};


// Validates the temperature based on the unit (Celsius or Fahrenheit) and the value.
const validateTemperature = (unit: string, value: number): boolean => {
    if (Number.isNaN(value)) return false; // Check if the value is a valid number

    // Define min and max temperature limits based on the unit
    const min = unit === 'C' ? -70 : -100;
    const max = unit === 'C' ? 70 : 160;

    return value >= min && value <= max; 
};


// Object containing specific validation methods for different fields
const validators = {
    cityName: (name: string): boolean => validateInput(name, validationConfig.city),
    countryName: (name: string): boolean => Object.values(countriesList).includes(name.trim()),
    beerName: (name: string): boolean => validateInput(name, validationConfig.beer),
    temperature: (unit: 'C' | 'F', value: number): boolean => validateTemperature(unit, value),
    withSpacesRegex: (value: string): boolean => {
        const isValidProp = /^[\w-]+$/.test(value);
        if (!isValidProp) {
            throw new Error('Invalid item name prop: should only contain alphanumeric characters and hyphens.');
        }
        return isValidProp; // Return the validation result
    },
};

/** Toggles validation classes on an input element based on its validity.
* @returns {number} - 1 if valid, 0 if invalid.
*/
const toggleValidationClasses = (isValid: boolean, element: HTMLElement): number => {
    try {
        element.classList.toggle('is-invalid', !isValid); 
        element.classList.toggle('is-valid', isValid); 
        return isValid ? 1 : 0; 
    } catch (error) {
        console.error(element, error);
        return NaN;
    }
};

/**
 * @returns {object} - An object containing:
 *   - validationResult {number}: Product of the validation results of all form fields (1 if all valid, 0 if any invalid).
 *   - review {ReviewData}: Sanitized review data from the form.
 */
const formValidator = (form: HTMLFormElement): { validationResult: number, review: ReviewData } => {
    const {
        hoppinessRating,
        overallRating,
        maltinessRating,
        termsWasAccepted,
        country,
        city,
        beerType,
        temperatureUnit,
        temperature,
        reviewComment,
        _csrfToken,
    } = form;

    const review: ReviewData = {
        hoppinessRating: hoppinessRating.value,
        overallRating: overallRating.value,
        maltinessRating: maltinessRating.value,
        termsWasAccepted: termsWasAccepted.checked,
        countryName: sanitize(country.value),
        cityName: sanitize(city.value),
        beerType: sanitize(beerType.value),
        comment: sanitize(reviewComment.value),
        temperatureUnit: temperatureUnit.value,
        temperature: parseFloat(temperature.value),
        _csrfToken: _csrfToken.value 
    };

    const validations = [
        toggleValidationClasses(review.hoppinessRating > 0, hoppinessRating[0]),
        toggleValidationClasses(review.overallRating > 0, overallRating[0]),
        toggleValidationClasses(review.maltinessRating > 0, maltinessRating[0]),
        toggleValidationClasses(review.termsWasAccepted, termsWasAccepted),
        toggleValidationClasses(validators.countryName(review.countryName), country),
        toggleValidationClasses(validators.cityName(review.cityName), city),
        toggleValidationClasses(validators.beerName(review.beerType), beerType),
        toggleValidationClasses(validators.temperature(review.temperatureUnit, review.temperature), temperature)
    ];

    const validationResult = validations.reduce((acc, curr) => acc * curr, 1);

    return { validationResult, review };
};



export { validators, toggleValidationClasses, formValidator, countriesList };
