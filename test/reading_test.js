const assert = require('assert');
const User = require('../src/users');

describe('Reading User out of the database', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({
			name: 'Joe'
		})
		joe.save().then(() => {
			done()
		})
	});

	it('finds all user with the name of joe', (done) => {
		User.find({
			name: 'Joe'
		}).then(users => {
			assert(users[0]._id.toString() === joe._id.toString())
			done();
		}).catch((err) => {
			console.log(err);
		});
	});
});