var config = {
  db: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'hare',
    port: 3306,
    debug: false
  },
  
  site: {
    url: 'http://localhost:3000',
    title: 'CodeJobs',
    language: 'en',
    theme: 'default',
    html: {
      engine: 'jade',
      minify: true
    }
  },
  
  application: {
    controllers: {
      default: 'home'
    },
    
    languages: [ 
      'en', 'es', 'fr', 'it', 'pt', 'ge', 'ch', 'jp' 
    ]
  },
  
  server: {
    environment: 'local',
    debug: true
  },

  security: {
    salt: 'ehLl6Ymg1QwC3N97HTpd7SK8tRvW2vsPgBLRP2uC4]m_'
  }
};

module.exports = config;