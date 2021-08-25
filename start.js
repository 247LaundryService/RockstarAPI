const dotenv = require('dotenv');
const app = require('./server.js');

dotenv.config();

// Constants
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST);

// eslint-disable-next-line no-console
console.log(`Running on http://${HOST}:${PORT}`);
