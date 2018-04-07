const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
	title: String,
	content: String,
	comments: [{
		// This is passing a reference to another record in a different collection
		type: Schema.Types.ObjectId,
		ref: 'comment'
	}]
})

const BlogPost = mongoose.model('blogPosts', BlogPostSchema)

module.exports = BlogPost