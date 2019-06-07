import { toastr } from 'react-redux-toastr';

export const updateProfile = (user) => 
    (dispatch, getState, {getFirebase}) => {
        
        const firebase = getFirebase();
        const { isLoaded, isEmpty, ...updatedUser } = user;

        try {
            firebase.updateProfile(updatedUser);
            toastr.success('Success', 'You profile updated');
        } catch (e) {
            toastr.error('Oops!', 'Something went wrong');
            throw new Error({
                _error: e.message
            })
        }
    }