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
            throw new Error('Invalid itemName prop: should only contain alphanumeric characters and hyphens.');
        }
        return isValidProp; // Return the validation result
    }
};

/** Toggles validation classes on an input element based on its validity.
* @returns {number} - 1 if valid, 0 if invalid.
*/
const toggleValidationClasses = (isValid: boolean, element: HTMLInputElement): number => {
    element.classList.toggle('is-invalid', !isValid); 
    element.classList.toggle('is-valid', isValid); 
    return isValid ? 1 : 0; 
};

/**
 * @returns {number} - Product of the validation results of all form fields (1 if all valid, 0 if any invalid).
 */
const formValidator = (form: HTMLFormElement): number => {
    return (
        toggleValidationClasses(form.hoppinessRating.value, form.hoppinessRating[0]) *
        toggleValidationClasses(form.overallRating.value, form.overallRating[0]) *
        toggleValidationClasses(form.termsCheckbox.checked, form.termsCheckbox) *
        toggleValidationClasses(validators.countryName(form.country.value), form.country) *
        toggleValidationClasses(form.maltinessRating.value, form.maltinessRating[0]) *
        toggleValidationClasses(validators.cityName(form.city.value), form.city) *
        toggleValidationClasses(validators.beerName(form.beerType.value), form.beerType) *
        toggleValidationClasses(
            validators.temperature(form.temperatureUnit.value, parseFloat(form.temperature.value)),
            form.temperature
        )
    );
};

export { validators, toggleValidationClasses, formValidator };
