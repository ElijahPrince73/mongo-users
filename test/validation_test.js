const assert = require('assert');
const User = require('../src/users');

describe('Validating records', () => {
	it('requires a username', (done) => {
		const user = new User({
			name: undefined
		})
		const validationResult = user.validateSync();
		const {
			message
		} = validationResult.errors.name
		assert(message === 'Name is required')
		done()
	});

	it('reqires a username longer than 2 characters', (done) => {
		const user = new User({
			name: 'Al'
		})
		const validationResult = user.validateSync()
		const {
			message
		} = validationResult.errors.name

		assert(message === 'Message must be longer than 2 characters')
		done()
	});

	it('disallows invalid records from being saved', (done) => {
		const user = new User({
			name: 'AL'
		})
		user.save()
			.catch((validationResult) => {
				const {
					message
				} = validationResult.errors.name

				assert(message === 'Message must be longer than 2 characters')
				done()

			})
	});
});