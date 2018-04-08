const mongoose = require('mongoose');
const User = require('../src/users');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
	let joe, blogPost, comment
	beforeEach((done) => {
		joe = new User({
			name: "Joe"
		})
		blogPost = new BlogPost({
			title: 'JS is great',
			content: 'Yeah it is'
		})
		comment = new Comment({
			content: 'Congrats'
		})

		joe.blogPost.push(blogPost)
		blogPost.comments.push(comment)
		comment.user = joe
		// chain together many promises
		Promise.all([joe.save(), blogPost.save(), comment.save()])
			.then(() => done())

	})

	it.only('saves a relation between a user and a blogPost', (done) => {
		User.findOne({name: 'Joe'})
		.then((user) => {
			console.log(user);
			done()
		})
	});

});
