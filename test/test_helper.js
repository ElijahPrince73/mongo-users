const mongoose = require('mongoose');

mongoose.Promise = global.Promise

before((done) => {
	mongoose.connect('mongodb://localhost/users_test').then(() => {
		done()
	}, (error) => {
		console.warn('CANT CONNECT TO SERVER');
	})
});

beforeEach((done) => {
	mongoose.connection.collections.users.drop(() => {
		done()
	})
});