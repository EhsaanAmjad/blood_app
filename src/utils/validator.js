// frontend validator

const ONLY_NUMBERS_REGEX = /^[\d]+[.]{0,1}[\d]*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a single field based on the specified options.
 * 
 * @param {any} fieldValue - The value to validate.
 * @param {string} fieldName - The name of the field (e.g., 'phone'). Defaults to 'Field'.
 * @param {object} options - Validation rules (e.g. { min, max, regex, isRequired, isArray, isNumber, isEmail }).
 * @returns {object} { isValid, error }
 */
export function validateField(fieldValue, fieldName = 'Field', options = {}) {
    let isValid = true;
    let error = '';

    // Overwrite "Field" with something more descriptive (e.g. "First name")
    fieldName = options.label
        || (fieldName[0].toUpperCase() + fieldName.slice(1)).replaceAll('_', ' ');

    // 1. Required check
    if (options.isRequired) {
        // If expecting an array
        if (options.isArray && (!fieldValue || fieldValue.length === 0)) {
            isValid = false;
            error = `${fieldName} is required`;
            return { isValid, error };
        }
        // If expecting a string/number
        else if (!fieldValue || (typeof fieldValue === 'string' && fieldValue.trim().length === 0)) {
            isValid = false;
            error = `${fieldName} is required`;
            return { isValid, error };
        }
    }

    // 2. Handle numeric fields
    if (options.isNumber) {
        // 2a. Ensure it’s purely numeric
        if (fieldValue && !ONLY_NUMBERS_REGEX.test(fieldValue)) {
            isValid = false;
            error = `${fieldName} should be a number`;
            return { isValid, error };
        }

        // 2b. Convert to actual number
        const numericValue = Number(fieldValue);
        if (Number.isNaN(numericValue)) {
            isValid = false;
            error = `${fieldName} should be a valid number`;
            return { isValid, error };
        }

        // 2c. Check min/max
        if (options.min !== undefined && numericValue < options.min) {
            isValid = false;
            error = `Minimum value required is ${options.min}`;
            return { isValid, error };
        }
        if (options.max !== undefined && numericValue > options.max) {
            isValid = false;
            error = `Maximum value allowed is ${options.max}`;
            return { isValid, error };
        }

        // Done with numeric checks. Return early to skip any string checks.
        return { isValid, error };
    }

    // 3. Handle email
    if (options.isEmail) {
        if (fieldValue && !EMAIL_REGEX.test(fieldValue)) {
            isValid = false;
            error = `${fieldName} should be a valid email address`;
            return { isValid, error };
        }
    }

    // 4. If expecting an array but got something else
    if (options.isArray && fieldValue && !Array.isArray(fieldValue)) {
        isValid = false;
        error = `${fieldName} should be an array`;
        return { isValid, error };
    }

    // 5. For string fields
    if (!options.isArray && typeof fieldValue !== 'string') {
        // If it’s not a string at this point, show error
        isValid = false;
        error = `${fieldName} should be a string`;
        return { isValid, error };
    }

    // 6. min length for strings
    if (options.min !== undefined && fieldValue.trim().length < options.min) {
        isValid = false;
        error = `Minimum ${options.min} character${options.min > 1 ? 's' : ''} required`;
        return { isValid, error };
    }

    // 7. max length for strings
    if (options.max !== undefined && fieldValue.trim().length > options.max) {
        isValid = false;
        error = `Maximum ${options.max} character${options.max > 1 ? 's' : ''} allowed`;
        return { isValid, error };
    }

    // 8. Regex check for strings
    if (options.regex && fieldValue && !options.regex.test(fieldValue)) {
        isValid = false;
        error = `${fieldName} is not valid`;
        return { isValid, error };
    }

    return { isValid, error };
}

/**
 * Validates an entire data object based on an 'options' object.
 * 
 * @param {object} data - Key-value pairs to validate.
 * @param {object} options - The validation rules for each key in 'data'.
 * @returns {object} { allValid, errors }
 */
export function validateSubmissionData(data, options) {
    let allValid = true;
    const errors = {};

    Object.keys(data).forEach(key => {
        if (options[key]) {
            const { isValid, error } = validateField(data[key], key, options[key]);
            if (!isValid) {
                errors[key] = error;
                allValid = false;
            }
        }
    });

    return { allValid, errors };
}
