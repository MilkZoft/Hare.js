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
        },
        languages: {
            en: true,
            es: true,
            fr: true,
            it: true,
            pt: true,
            ge: true,
            ch: true,
            jp: true
        }
    },
    server: {
    	environment: 'local',
    	debug: true
    }
};

exports.config = config;
