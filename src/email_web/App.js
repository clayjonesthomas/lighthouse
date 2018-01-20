import React from 'react'
import {connect} from 'react-redux'

const App = ({children}) => (<div>{children}</div>)

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(App)