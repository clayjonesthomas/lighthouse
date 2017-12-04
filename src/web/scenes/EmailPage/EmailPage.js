import React, {PropTypes} from 'react'
import SubmitButton from 'ui-kit/SubmitButton'

const EmailPage = 
  ({
    onSubmit
  }) => (
    <div>
      <h1>Send email plz</h1>
      <SubmitButton
          onClick={() => onSubmit()}
        />
    </div>
  )

  EmailPage.propTypes = {}

  export default EmailPage
  