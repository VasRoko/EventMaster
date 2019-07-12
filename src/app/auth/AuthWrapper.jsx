import { connectedReduxRedirect} from 'redux-auth-wrapper/history4/redirect';
import { openModal } from '../actions/modalActions';

export const UserAuthenticated = connectedReduxRedirect({
    wrapperDisplayName: 'UserAuthenticated',
    allowRedirectBack: true,
    redirectPath: '/',
    authenticatedSelector: ({ firebase: {auth}}) => 
    auth.isLoaded && !auth.isEmpty,
    redirectAction: newLoc => (dispatch) => {
        dispatch(openModal('UnAuthModal'))
    }
})