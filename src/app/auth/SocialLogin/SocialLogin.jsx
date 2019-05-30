import React from 'react';
import {Button, Icon, Divider } from 'semantic-ui-react';


const SocialLogin = ({socialLogin}) => {
    return (
       <div>
            <Button onClick={() => socialLogin('facebook')} fluid color='facebook'>
                <Icon name='facebook' /> Login with Facebook
            </Button>
            <Divider fitted />
            <Button onClick={() => socialLogin('google')} fluid color='google plus'>
                <Icon name='google plus' /> Login with Google Plus
            </Button>
       </div>
    )
}

export default SocialLogin
