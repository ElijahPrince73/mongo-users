const assert = require('assert');
const User = require('../src/users');

describe('Updating records', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({
			name: 'Joe',
			likes: 0
		});
		joe.save()
			.then(() => done());
	});

	function assertName(operation, done) {
		operation
			.then(() => User.find({}))
			.then((users) => {
				console.log(users);
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	}
	// Mostly used for updating properties in a couple of steps
	it('instance type using set n save', (done) => {
		console.log(joe);
		joe.set('name', 'Alex');
		assertName(joe.save(), done);
	});
});