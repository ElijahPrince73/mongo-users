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

	// Update a record by passing in a unique attribute
	it('A model class can update ', (done) => {
		assertName(User.update({
			name: 'Joe'
		}, {
			name: 'Alex'
		}), done)
	});

	it('A model class can update one record', (done) => {
		assertName(
			User.findOneAndUpdate({
				name: 'Joe'
			}, {
				name: 'Alex'
			}),
			done
		);
	});

	it('A model class can find a record with an Id and update', (done) => {
		assertName(
			User.findByIdAndUpdate(joe._id, {
				name: 'Alex'
			}),
			done
		);
	});

	it('A user can have their post count incremented by 1', (done) => {
		User.update({
				name: 'Joe'
			}, {
				// This operator will find the key then update it by some value
				$inc: {
					likes: 1 // Decrement -1
				}
			}).then(() => {
				return User.findOne({
					name: 'Joe'
				})
			})
			.then((user) => {
				assert(user.likes === 1)
				done()
			})
	});
});
