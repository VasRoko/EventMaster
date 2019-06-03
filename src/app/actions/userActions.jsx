import moment from 'moment';
import toastr from 'react-redux-toastr';

const OopsError = (header = 'Oops!', message = 'Something went wrong') => {
    return  toastr.error(header, message);
}

export const updateProfile = (user) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        if (user.dob) {
            user.dob = moment(user.dbo).toDate();
        }

        try {
            await firebase.updateProfile(user);
            toastr.success('Success', 'You profile updated');
        } catch (e) {
            OopsError();
            throw new Error({
                _error: e.message
            })
        }
    }