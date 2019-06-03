import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Message, Divider } from 'semantic-ui-react';
import { combineValidators, isRequired } from 'revalidate';
import { Field, reduxForm } from 'redux-form';
import { renderTextInput } from '../../common/form/formComponents';
import { login, socialLogin } from '../../actions/authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
  login,
  socialLogin
}

const validate = combineValidators({
  email: isRequired('email'),
  password: isRequired('password'), 
});



const LoginForm = ({login, socialLogin, error, handleSubmit, submitting, passwordReset}) => {
  return (
    <div>
    <Form size="large" loading={submitting} onSubmit={handleSubmit(login)}>
      { error &&
        <Message basic pointing="below" color="red">{ error }</Message>       
      }
      <Field type="text" name="email" component={renderTextInput} placeholder="Email Address"/>
      <Field type="password" name="password" component={renderTextInput} placeholder="Password"/>
      <Button fluid size="large" color="teal">Login</Button>
      <div>
        <Divider />
        <Link to='#'onClick={passwordReset}>Forgot your password ?</Link>
      </div>
      <Divider horizontal> Or </Divider>
      <SocialLogin socialLogin={socialLogin} />
    </Form>
    </div>
  )
}

export default connect(null, actions)(reduxForm({form: 'loginForm', validate})(LoginForm));
