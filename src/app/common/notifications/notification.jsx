import { toastr } from 'react-redux-toastr';

export const successNotification = (header = 'Success!', message = 'Action succesfully completed') => {
    return  toastr.success(header, message);
}

export const warningNotification = (header = 'Warning!', message = 'New worning message') => {
    return  toastr.warning(header, message);
}

export const errorNotification = (header = 'Oops!', message = 'Something went wrong') => {
    return  toastr.error(header, message);
}