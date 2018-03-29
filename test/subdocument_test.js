const assert = require('assert');
const User = require('../src/users');

describe('Subdocument', () => {
	it('Can create a Subdocument', (done) => {
		const joe = new User({
			name: 'Joe',
			posts: [{
				title: 'Just a new title'
			}]
		})

		joe.save()
			.then(() => User.findOne({
				name: 'Joe'
			}))
			.then((user) => {
				assert(user.posts[0].title === 'Just a new title')
				done()
			})
	});
});