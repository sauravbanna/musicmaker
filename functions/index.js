const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();

const database = admin.firestore();

exports.createFollowers = functions.firestore
    .document('users/{userId}')
    .onCreate((snapshot, context) => {
        const userId = context.params.userId;
        database.doc('followers/' + userId).set({followers: []})
            .then(() => {

            },
            () => {
                console.log("fail");
            })
    });