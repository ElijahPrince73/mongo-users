const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test').then(() => {
	console.log('GOOD TO GO!!!');
}, (error) => {
	console.warn('CANT CONNECT TO SERVER');
})