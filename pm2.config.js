module.exports = {
    apps : [{
      name: 'dezignspiration-frontend',
      script: 'server.js',
      instances: 0,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      exec_mode: 'cluster'
    }],
  };
  