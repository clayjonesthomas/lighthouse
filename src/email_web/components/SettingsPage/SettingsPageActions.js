export const EMAIL_FREQUENCY_CHANGE = 'EMAIL_FREQUENCY_CHANGE'
export const SAVE_SETTINGS_FORM = 'SAVE_SETTINGS_FORM'

export const emailFrequencyChange = (value) => {
  return {
    type: EMAIL_FREQUENCY_CHANGE,
    data: value
  }
}

export const onSaveSettingsRef = (ref, type) => {
  return {
    type: SAVE_SETTINGS_FORM_REF,
    data: {
      type: type,
      ref: ref
    }
  }
}