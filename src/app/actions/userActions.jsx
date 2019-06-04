import moment from 'moment';
import { toastr } from 'react-redux-toastr';

export const updateProfile = (user) => 
    (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        if (user.dob) {
            user.dob = moment(user.dob).toDate();
        }

        try {
            firebase.updateProfile(user);
            toastr.success('Success', 'You profile updated');
        } catch (e) {
            toastr.error('Oops!', 'Something went wrong');
            throw new Error({
                _error: e.message
            })
        }
    }