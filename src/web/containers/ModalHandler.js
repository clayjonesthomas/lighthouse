import LoginModal from '../components/LoginModal'
import {connect} from 'react-redux'

const MODAL_COMPONENTS = {
  'LOGIN': LoginModal
}

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <span />
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal {...modalProps} />
}

export default connect(
  state => state.modal
)(ModalRoot)