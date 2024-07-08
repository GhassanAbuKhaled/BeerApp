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

    if(rule) return rule.regex.test(input) && validateLength(input, rule.minLength, rule.maxLength);
    return false;
};


const validateTemperature = (unit: string, value: number) => {
    if(!value) return false;    
    const min = (unit === 'C') ? -70 : -100
    const max = (unit === 'C') ? 70 : 160;
    return value >= min && value <= max;
}

// Validation object with specific methods
const validators = {
    cityName: (name: string): boolean => validateInput(name, validationConfig.city),
    countryName: (name: string): boolean => validateInput(name, validationConfig.country),
    beerName: (name: string): boolean => validateInput(name, validationConfig.beer),
    temperatue: (unit: 'C' | 'F', value: number): boolean => validateTemperature(unit, value),
    withSpacesRegex: (value: string) => {
        // Validate: Ensure the value contains only word characters and hyphens
        const isValidProp = /^[\w-]+$/.test(value);
        if (!isValidProp) {
        throw new Error('Invalid itemName prop: should only contain alphanumeric characters and hyphens.');
        }
        return isValidProp;                         
    } 
      
};

const classValidToggle = (isValid: boolean, element: HTMLElement): number => {
    element.classList.toggle('is-invalid', !isValid);
    element.classList.toggle('is-valid', isValid);
    return isValid ? 1 : 0;
};

const formValidator = (form: HTMLFormElement) => {
                               
    return(               
     classValidToggle(form.hoppinessRating.value > 0 , form.hoppinessRating[0]) *
     classValidToggle(form.maltinessRating.value > 0, form.maltinessRating[0]) *
     classValidToggle(form.overallRating.value > 0, form.overallRating[0]) *
     classValidToggle(form.termsCheckbox.checked , form.termsCheckbox) *
     classValidToggle(validators.temperatue(form.temperatureUnit.value, form.temperature.value), form.temperature) *
     classValidToggle(validators.countryName(form.country.value), form.country) *
     classValidToggle(validators.cityName(form.city.value), form.city) *
     classValidToggle(validators.beerName(form.beerType.value), form.beerType)
    );

}
export { validators, classValidToggle, formValidator };
