export const SAVE_SETTINGS_FORM_REF = 'SAVE_SETTINGS_FORM_REF'

export const onSaveSettingsRef = (ref, type) => {
  return {
    type: SAVE_SETTINGS_FORM_REF,
    data: {
      type: type,
      ref: ref
    }
  }
}