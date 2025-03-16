const express = require('express');
const user = require('./db_service/user');
const todo = require('./db_service/todo');
const app = express();

app.use(express.json());

app.use('/api/user', user); // Tambahkan "/" di awal path
app.use('/api/todo', todo); // Tambahkan "/" di awal path

const port = 3000;
app.listen(port, () => {
    console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
