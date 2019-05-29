import React from 'react';
import {Button, Icon, Divider } from 'semantic-ui-react';


const SocialLogin = ({socialLogin}) => {
    return (
       <div>
            <Button onClick={() => socialLogin('facebook')} fluid color='facebook'>
                <Icon name='facebook' /> Login with Facebook
            </Button>
            <Divider fitted />
            <Button fluid color='youtube'>
                <Icon name='youtube' /> Login with Youtube
            </Button>
       </div>
    )
}

export default SocialLogin
