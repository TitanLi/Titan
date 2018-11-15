const Database = require('./class.js');
const config = {
    host: 'localhost',
    user: 'root',
    password: 'apple'
}
const database = new Database(config);

console.log(database.test());