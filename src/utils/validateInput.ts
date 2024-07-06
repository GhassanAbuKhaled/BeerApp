type ValidationRule = {
    regex: RegExp;
    minLength: number;
    maxLength: number;
};

type ValidationConfig = {
    [key: string]: ValidationRule;
};

// Validation configuration object
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


// Helper function to validate input length
const validateLength = (input: string, minLength: number, maxLength: number): boolean => {
    const trimmedInput = input.trim();
    return trimmedInput.length >= minLength && trimmedInput.length <= maxLength;
};

// Generic validation function
const validateInput = (input: string, rule: ValidationRule): boolean => {
    if (!rule) {
        console.error('Validation rule is undefined.');
        return false;
    }
    if (!rule.regex.test(input)) {
        return false;
    }
    return validateLength(input, rule.minLength, rule.maxLength);
};

// Validation object with specific methods
const validate = {
    cityName: (input: string): boolean => validateInput(input, validationConfig.city),
    countryName: (input: string): boolean => validateInput(input, validationConfig.country),
    beerName: (input: string): boolean => validateInput(input, validationConfig.beer),
};

export default validate;
