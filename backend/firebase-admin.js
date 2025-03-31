const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com"
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };