const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/todo_list';

mongoose.connect(mongoURI)
.then(() => console.log("mongodb berjalan di local"))
.catch(err => console.log(err))

module.exports = mongoose;
