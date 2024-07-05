import DOMPurify from 'dompurify';

type InputRecord = Record<string, string>;

/**
 * Sanitizes input values from a form event using DOMPurify.
 * @param event The form event containing input fields to sanitize.
 * @returns A record of sanitized input values keyed by input name.
 */
const sanitizeInputs = (event: Event): InputRecord => {
    const sanitizedInputs: InputRecord = {}; // Initialize an object to store sanitized inputs

    const target = event.target as HTMLFormElement; // Cast event.target as HTMLFormElement

    const inputs = target.querySelectorAll<HTMLInputElement>('input'); // Select all input elements in the form

    inputs.forEach((input) => {
        sanitizedInputs[input.name] = DOMPurify.sanitize(input.value); // Sanitize each input value and store in sanitizedInputs
    });

    return sanitizedInputs; // Return the sanitized inputs record
};

export default sanitizeInputs;
