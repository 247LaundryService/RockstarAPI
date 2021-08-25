const format = (ut) => {
  const pad = (s) => (s < 10 ? '0' : '') + s;

  const hours = Math.floor(ut / (60 * 60));
  const minutes = Math.floor((ut % (60 * 60)) / 60);
  const seconds = Math.floor(ut % 60);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

/**
 * K8 app liveness health check
 * @function
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The callback function
 * @return {function} - Returns the called callback function
 */
exports.livenessProbe = async (req, res, next) => {
  const healthcheck = {
    uptime: format(process.uptime()),
    message: 'ALIVE',
    timestamp: new Date().toLocaleString(),
    build: process.env.CI_BUILD || '',
    branch: process.env.CI_BRANCH || '',
    sha: process.env.CI_SHA || '',
  };

  if (true) {
    res.status(200).json({ healthcheck });
  } else {
    res.status(503).json({ healthcheck });
  }
  return next();
};

/**
 * K8 app readyness health check
 * @function
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The callback function
 * @return {function} - Returns the called callback function
 */
exports.readynessProbe = async (req, res, next) => {
  const healthcheck = {
    uptime: format(process.uptime()),
    message: 'READY',
    timestamp: new Date().toLocaleString(),
    build: process.env.CI_BUILD || '',
    branch: process.env.CI_BRANCH || '',
    sha: process.env.CI_SHA || '',
  };

  if (true) {
    res.status(200).json({ healthcheck });
  } else {
    res.status(503).json({ healthcheck });
  }
  return next();
};

/**
 * K8 app startup health check
 * @function
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The callback function
 * @return {function} - Returns the called callback function
 */
exports.startupProbe = async (req, res, next) => {
  const healthcheck = {
    uptime: format(process.uptime()),
    message: 'STARTUP',
    timestamp: new Date().toLocaleString(),
    build: process.env.CI_BUILD || '',
    branch: process.env.CI_BRANCH || '',
    sha: process.env.CI_SHA || '',
  };

  res.status(200).json({ healthcheck });

  return next();
};
