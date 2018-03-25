const assert = require('assert');
const User = require('../src/users');

describe('Deleting a user', () => {
	let joe;

	beforeEach((done) => {
		joe = new User({
			name: 'Joe'
		})
		joe.save()
			.then(() => {
				done()
			})
	});

	it('model intance remove', (done) => {
		joe.remove()
			.then((value) => User.findOne({
				name: 'Joe'
			}))
			.then((user) => {
				assert(user === null)
				done()
			})
	});

	it('class method remove', (done) => {
		// Remove a bunch of records with a given criteria
		User.remove({
				name: 'Joe'
			}).then((value) => User.findOne({
				name: 'Joe'
			}))
			.then((user) => {
				assert(user === null)
				done()
			})
	});

	it('class method find and remove', (done) => {
		User.findOneAndRemove({
				name: 'Joe'
			}).then((value) => User.findOne({
				name: 'Joe'
			}))
			.then((user) => {
				assert(user === null)
				done()
			})
	});

	it('class method find by id and remove ', (done) => {
		User.findByIdAndRemove(joe._id)
			.then((value) => User.findOne({
				name: 'Joe'
			}))
			.then((user) => {
				assert(user === null)
				done()
			})
	});
});