const requestValidator = require('./requestValidator');

/**
 * Validate the data received from the client
 * and if it doesn't pass send fail object
 * @function
 * @param {object} res - The response object
 * @param {function} next - The called function to return if validation does not pass
 * @param {object} dataTypeArry - The object to pass to requestValidator util function
 * @return Returns the called next function if test fails or return nothing if all is good
 */
const validate = (dataTypeArry) => {
  const validationPassed = requestValidator(dataTypeArry);
  return validationPassed;
};

module.exports = validate;
