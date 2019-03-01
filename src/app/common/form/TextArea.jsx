  import React from 'react'
  import { Form, Label } from 'semantic-ui-react'
  
  const TextArea = ({ input, width, rows, placeholder, meta: { touched, error } }) => {
    return (
        <Form.Field error={touched && !!error } width={width}>
            <textarea { ...input} placeholder={placeholder} rows={rows} />
            {touched && error && <Label basic color='red' pointing>{error}</Label>}
        </Form.Field>
    )
  }
  
  export default TextArea
  