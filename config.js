const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    baseUrl: process.env.BASE_URL,
    userName: process.env.USER_NAME,
    userEmail: process.env.USER_EMAIL
}