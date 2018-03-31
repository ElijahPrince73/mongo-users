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
	posts: [PostSchema]
})

// important: need to use the function and not arrow to use the UserSchema
UserSchema.virtual('postCount').get(function () {
	return this.posts.length
})

const User = mongoose.model('user', UserSchema)

module.exports = User
