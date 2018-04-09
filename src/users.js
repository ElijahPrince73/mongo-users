const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema

const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: 'Message must be longer than 2 characters'
		},
		required: [true, 'Name is required']
	},
	posts: [PostSchema],
	likes: Number,
	blogPosts: [{
		type: Schema.Types.ObjectId,
		ref: 'blogPosts'
	}]
})

// important: need to use the function and not arrow to use the UserSchema
UserSchema.virtual('postCount').get(function() {
	return this.posts.length
})

// Need reguler function
UserSchema.pre('remove', function(next) {
	// this === Joe
	const BlogPost = mongoose.model('blogPosts')

	BlogPost.remove({
			_id: {
				$in: this.blogPosts
			}
		})
		.then(() => {
			next()
		})
})

const User = mongoose.model('users', UserSchema)

module.exports = User