const assert = require('assert');
const User = require('../src/users');

describe('Subdocument', () => {
	it('Can create a subdocument', (done) => {
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

	it('Can add subdocuments to an existing record', (done) => {
		const joe = new User({
			name: 'Joe',
			posts: []
		});

		joe.save()
			.then(() => User.findOne({
				name: 'Joe'
			}))
			.then((user) => {
				user.posts.push({
					title: 'New Post'
				});
				return user.save();
			})
			.then(() => User.findOne({
				name: 'Joe'
			}))
			.then((user) => {
				assert(user.posts[0].title === 'New Post');
				done();
			});
	});

	it('Can remove a existing subdocument', (done) => {
		const joe = new User({
			name: 'Joe',
			posts: [{title: 'New title'}]
		})

		joe.save()
			.then(() => User.findOne({
				name: 'Joe'
			}))
			.then((user) => {
				// Does not save the record automatically
				user.posts[0].remove()
				//Have to save this
				return user.save()
			})
			.then(() => User.findOne({
				name: 'Joe'
			}))
			.then((user) => {
				assert(user.posts.length === 0)
				done()
			})
	});
});
