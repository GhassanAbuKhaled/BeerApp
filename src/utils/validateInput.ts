import { sanitize } from "dompurify";

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
    country: {
        regex: /^(?!.*\s{3})(?!.*\b\w{25,}\b)[\p{L}\p{M}\s\-'éèêëàáâäãåçìíîïòóôöùúûüÿýæœ.,&\u{1F1E6}-\u{1F1FF}]+$/u,
        minLength: 2,
        maxLength: 50,
    },
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
    countryName: (name: string): boolean => validateInput(name, validationConfig.country),
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



export { validators, toggleValidationClasses, formValidator};
