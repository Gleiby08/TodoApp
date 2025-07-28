const PAGE_URL = process.env.NODE_ENV === 'production'
  ? 'https://todoapp-xg5t.onrender.com'
  : 'http://localhost:5500';

const MONGO_URI = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_TEST;

module.exports = { PAGE_URL, MONGO_URI };