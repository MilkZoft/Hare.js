var config = {
	db: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'codejobs_node',
		port: 3306
	},
    site: {
    	url: 'http://localhost:3000',
    	title: 'CodeJobs',
        language: 'en'
    },
    application: {
        controllers: {
            default: 'home'
        }
    },
    server: {
    	environment: 'local',
    	debug: true
    }
};

exports.config = config;
