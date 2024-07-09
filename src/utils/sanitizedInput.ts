import DOMPurify from "dompurify";

/**
 * Sanitizes input values from a form event using DOMPurify.
 * @param data The input data object containing input fields to sanitize.
 * @returns A record of sanitized input values keyed by input name.
 */
const sanitizeInputs = (data: InputRecord): InputRecord => {
  const sanitizedInputs: InputRecord = {};

  for (const key in data) {
    sanitizedInputs[key] = DOMPurify.sanitize(data[key]);
  }

  return sanitizedInputs;
};

export  default sanitizeInputs;
