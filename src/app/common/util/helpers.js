export const createNewEvent = (user, photoURL, event) => {
        return {
            ...event,
            hostUid: user.uid,
            hostedBy: user.displayName,
            hostPhotoUrl: photoURL || '/assets/img/user.png',
            created: new Date(),
            attendees: {
                [user.uid]: {
                    going: true,
                    joinDate: new Date(),
                    photoURL: photoURL || '/assets/img/user.png',
                    displayName: user.displayName,
                    host: true
                }
            }
        }
}