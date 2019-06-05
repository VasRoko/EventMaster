import React from 'react';
import { Header, Button, Icon, Segment } from 'semantic-ui-react';
import UpdateEmailForm from './UpdateEmailForm';
import UpdatePasswordForm from './UpdatePasswordForm';

const AccountPage = ({ account, updatePassword, updateEmail, providerId }) => {
   return (
   <div>
       <Header dividing size="large" content="Account"/>
       {providerId && providerId === 'password' &&
        <div>
            <UpdateEmailForm updateEmail={updateEmail} initialValues={account} />
            <UpdatePasswordForm updatePassword={updatePassword} />
        </div>
       }
       {providerId && providerId === 'facebook.com' &&
       <div>
           <Segment>
            <Header color="teal" sub content="Facebook Account" />
            <p>Please visit Facebook to update your account settings</p>
                <Button type="button" color="facebook">
                    <Icon name="facebook" />Go to Facebook
                </Button>
            </Segment>
       </div>
       }
       {providerId && providerId === 'google.com' &&
       <div>
           <Segment>
            <Header color="teal" sub content="Google Plus Account" />
            <p>Please visit Facebook to update your account settings</p>
                <Button type="button" color="google plus">
                    <Icon name="google plus" />Go to Google Plus
                </Button>
           </Segment>
       </div>
       }
   </div>
   )
};

export default AccountPage;