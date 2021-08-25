const validator = require('validator');
const _ = require('lodash');

/**
 * Validate if something is a string
 * @function
 * @param {string} data - The string to test
 * @return {boolean} - Return if it's a string or not
 */
const validateString = (data) => {
  const trimmed = data.trim();
  return typeof trimmed === 'string';
};

/**
 * Validate if something is a boolean
 * @function
 * @param {boolean} data - The boolean to test
 * @return {boolean} - Return if it's a boolean or not
 */
const validateBool = (data) => data === false || data === true;

/**
 * Validate if something startWith 'auth0|'
 * @function
 * @param {string} data - The string to test
 * @return {boolean} - Return if it start with 'auth0|' or not
 */
const validateAuth0 = (data) => data.startsWith('auth0|');

/**
 * Validate if something is an array
 * @function
 * @param {object} data - The array to test
 * @return {boolean} - Return if it is an array or not
 */
const validateArray = (data) => Array.isArray(data);

/**
 * Validate if something is an email
 * @function
 * @param {string} data - The email to test
 * @return {boolean} - Return if it is an email or not
 */
const validateEmail = (data) => {
  const res = validator.isEmail(data);
  return res;
};

/**
 * Validate if something is a phone number
 * @function
 * @param {string} data - The phone number to test
 * @return {boolean} - Return if it is a phone number or not
 */
const validatePhone = (data) => {
  const isValid = validator.isMobilePhone(data, 'any');
  return isValid;
};

/**
 * Validate if something is an integer
 * @function
 * @param {number} data - The integer to test
 * @return {boolean} - Return if it is an integer or not
 */
const validateInt = (data) => Number.isInteger(data);

/**
 * Validate if something is a latitude-longitude coordinate
 * @function
 * @param {string} data - The latitude-longitude coordinate to test
 * @return {boolean} - Return if it is a latitude-longitude coordinater or not
 */
const validateLatLong = (data) => validator.isLatLong(data);

/**
 * Validate if something has body
 * @function
 * @param {object} data - The object to test
 * @return {boolean} - Return if it coordinater or not
 */
const validateHasBody = (data) => !_.isEmpty(data);


/**
 * Validate key and value
 * @function
 * @param {string} key - The type of test
 * @param {*} value - The value to test it's type
 * @return {boolean} - Returns true or false
 */
const isValid = (key, value) => {
  switch (key) {
    case 'array':
      return validateArray(value);
    case 'string':
      return validateString(value);
    case 'bool':
      return validateBool(value);
    case 'auth0':
      return validateAuth0(value);
    case 'email':
      return validateEmail(value);
    case 'phone':
      return validatePhone(value);
    case 'int':
      return validateInt(value);
    case 'LatLong':
      return validateLatLong(value);
    case 'objectBody':
      return validateHasBody(value);
    default:
      return false;
  }
};

/**
 * Iterates through the array for validation
 * @function
 * @param {array} allData - An array of objects to test
 * @return {boolean} - Returns if the collection passed or failed
 */
module.exports = (allData) => {
  try {
    let validationPassed = true;
    // eslint-disable-next-line no-restricted-syntax
    for (const keyVal of allData) {
      const key = Object.keys(keyVal)[0];
      const value = Object.values(keyVal)[0];
      const isOptional = Object.values(keyVal)[1] || false;
      const { isNullable } = keyVal;
      let res = (typeof value !== 'undefined') ? isValid(key, value) : false;
      if (value === null && isNullable) {
        res = true;
      }
      if (!res) {
        // if may not be valid
        if (typeof value !== 'undefined') {
          // if value exists
          validationPassed = false;
          break;
        }

        if (typeof value === 'undefined' && !isOptional) {
          // if its undefined and not optional
          validationPassed = false;
          break;
        }
      }
    }
    return validationPassed;
  } catch (error) {
    return false;
  }
};
