import React from 'react'
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateInput({ input: { value, onChange, ...restInput}, width, placeholder, meta: {touched, error}, ...rest}) {
  return (
    <Form.Field error={touched && !!error} width={width}>
        <DatePicker 
            {...rest}
            placeholderText={placeholder}
            selected={value ? new Date(value) : null }
            onChange={onChange}
            {...restInput}
        />
        {touched && error && <Label basic color='red' pointing>{error}</Label>}
    </Form.Field>
  )
}

export default DateInput
