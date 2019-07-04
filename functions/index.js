const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.createActivity = functions.firestore.document('events/{eventId}').onCreate(event => {
    let newEvent = event.data();

    console.log(newEvent);

    const activity = {
        type: 'newEvent',
        eventDate: newEvent.date,
        hostedBy: newEvent.hostedBy,
        title: newEvent.title,
        photoURL: newEvent.hostPhotoUrl,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        hostUid: newEvent.hostUid,
        eventId: event.id
    }

    console.log(activity);

    return admin.firestore().collection('activity').add(activity).then((docRef) => {
        return console.log('Activity cretea with ID: ', docRef.id)
    }).catch((e) => {
        return console.log('Error adding activity ', e);
    })
})