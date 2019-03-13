import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../common/form/TextInput';
import { login } from '../../actions/authActions';

const actions = {
  login
}

const LoginForm = ({login, handleSubmit}) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
        <Segment>
            <Field type="text" name="email" component={TextInput} placeholder="Email Address"/>
            <Field type="password" name="password" component={TextInput} placeholder="Password"/>
            <Button fluid size="large" color="teal">Login</Button>
        </Segment>
    </Form>
  )
}

export default connect(null, actions)(reduxForm({form: 'loginForm'})(LoginForm));
