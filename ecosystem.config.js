module.exports = {
  apps: [{
    name: 'Rockstar Energy API Proxy',
    script: './start.js',
    instances: 'max',
    max_memory_restart: '256M',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
