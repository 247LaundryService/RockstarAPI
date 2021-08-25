/**
 * Manages the response if found or not
 * @function
 * @param {object} res - The response object
 * @param {object} sendDataBack - The object to send back
 * @param {boolean} isTrue - The conditional to test
 * @param {string} message - The message to set if test fails
 */
const responseManager = (res, data, isTrue, message) => {
  if (isTrue) {
    // If found respond 200
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    console.log('data: ', data);
    res.status(200).json({ success: true, data, message: '' });
  } else {
    // If not found respond 400
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.status(400).json({ success: false, data, message });
  }
};

module.exports = responseManager;
