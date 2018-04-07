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
	const {
		users,
		comments,
		blogposts
	} = mongoose.connection.collections;

	users.drop(() => {
		comments.drop(() => {
			blogposts.drop(() => {
				done();
			});
		});
	});
});