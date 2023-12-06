const {Client} = require ('pg');
const client = new Client('postres://localhost:5432/robots_sales');

module.exports = client;