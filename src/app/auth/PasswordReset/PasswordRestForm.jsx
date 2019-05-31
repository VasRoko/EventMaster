import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message, Divider } from 'semantic-ui-react';
import { combineValidators, isRequired } from 'revalidate';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../common/form/TextInput';
import { resetPassword, } from '../../actions/authActions';

const actions = {
    resetPassword,
}

const validate = combineValidators({
  email: isRequired('email'),
});

const PasswordRestForm = ({resetPassword, error, handleSubmit, submitting}) => {
  return (
    <Form size="large" loading={submitting} onSubmit={handleSubmit(resetPassword)}>
      { error ? <Message basic pointing="below" color="red">{ error }</Message> :  <p>To reset your password, enter your Event Master email.</p> }
        <Field type="text" name="email" component={TextInput} placeholder="Email Address"/>
        <Button fluid size="large" color="teal">Send</Button>
    </Form>
  )
}

export default connect(null, actions)(reduxForm({form: 'passwordReset', validate})(PasswordRestForm));
