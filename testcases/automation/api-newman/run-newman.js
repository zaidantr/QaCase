const newman = require('newman');

newman.run(
  {
    collection: require('./collections/wemine-api.postman_collection.json'),
    environment: require('./environments/test.postman_environment.json'),
    reporters: ['cli', 'htmlextra'],
    reporter: {
      htmlextra: {
        export: './reports/newman-report.html'
      }
    }
  },
  function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log('Newman test execution completed successfully.');
  }
);