const assert = require('assert');
const User = require('../src/users');

describe('Reading User out of the database', () => {
	let joe, maria, alex, zach;

	beforeEach((done) => {
		alex = new User({
			name: 'Alex'
		})
		joe = new User({
			name: 'Joe'
		})
		maria = new User({
			name: 'Maria'
		})
		zach = new User({
			name: 'Zach'
		})
		Promise.all([joe.save(), alex.save(), maria.save(), zach.save()])
			.then(() => done())
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

	it('Find a user with a id', (done) => {
		User.findOne({
			_id: joe._id
		}).then((user) => {
			assert(user.name === 'Joe')
			done()
		})
	});
	it.only('Can skip and limit the result set', (done) => {
		User.find({})
			//	sort all users in a ascending fashion
			// descending -1 === c, b, a
			// ascending 1 === a, b, c
			.sort({
				name: 1
			})
			.skip(1)
			.limit(2)
			.then((users) => {
				console.log(users);
				assert(users.length === 2)
				assert(users[0].name === 'Joe')
				assert(users[1].name === 'Maria')
				done()
			})
	});
});