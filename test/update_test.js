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
				assert(users.length === 1);
				assert(users[0].name === 'Alex');
				done();
			});
	}
	// Mostly used for updating some properties in a couple of steps
	it('instance type using set n save', (done) => {
		joe.set('name', 'Alex');
		assertName(joe.save(), done);
	});

	// Updates once and call it done
	it('Model instance can update', (done) => {
		assertName(joe.update({
			name: 'Alex'
		}), done)
	});
});