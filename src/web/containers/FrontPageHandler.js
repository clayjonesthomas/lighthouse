import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const FrontPageHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage)

export default FrontPageHandler