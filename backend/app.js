const express = require('express');
const user = require('./db_service/user');
const todo = require('./db_service/todo');
const app = express();

app.use(express.json());

app.use('/api/user', user);
app.use('/api/todo', todo);

const port = 3000;
app.listen(port, () => {
    console.log(`🚀 Server berjalan di http://localhost:${port}`);
});
