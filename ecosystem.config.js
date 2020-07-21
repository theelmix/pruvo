module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps : [
  
      // First application
      {
        name      : 'PRUVO',
        script    : 'dist/app.js',
        env: {
          PORT: 3001
        }
      },
      // Second application
      {
        name      : 'PRUVO',
        script    : 'dist/app.js',
        env: {
          PORT: 3002
        }
      }

    ]
  }