const functions = require('firebase-functions');
const admin = require('firebase-admin');

const newActivity = (type, event, id) => {
    return  {
        type: type,
        eventDate: event.date,
        hostedBy: event.hostedBy,
        title: event.title,
        photoURL: event.hostPhotoUrl,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        hostUid: event.hostUid,
        eventId: event.id
    }
}

admin.initializeApp(functions.config().firebase);

exports.createActivity = functions.firestore.document('events/{eventId}').onCreate(event => {
    let newEvent = event.data();

    console.log(newEvent);

    const activity = newActivity('newEvent', newEvent, event.id)

    console.log(activity);

    return admin.firestore().collection('activity').add(activity).then((docRef) => {
        return console.log('Activity creted with ID: ', docRef.id)
    }).catch((e) => {
        return console.log('Error adding activity ', e);
    })
})

exports.cancelActivity = functions.firestore.document('events/{eventId}').onUpdate((event, context) => {
    let updatedEventData = event.after.data();
    let previousEventData = event.before.data();

    console.log({event});
    console.log({context});
    console.log({updatedEventData});
    console.log({previousEventData});

    if (!updatedEventData.cancelled || updatedEventData.cancelled === previousEventData.cancelled) {
        return false;
    }

    const activity = newActivity('cancelledEvent', updatedEventData, context.params.eventId );
    console.log({activity});

    return admin.firestore().collection('activity').add(activity).then((docRef) => {
        return console.log('Activity deleted with ID: ', docRef.id)
    }).catch((e) => {
        return console.log('Error adding activity ', e);
    })
});