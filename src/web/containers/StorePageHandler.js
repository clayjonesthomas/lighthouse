import $ from 'jquery'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import StorePage from '../components/StorePage'

const mapStateToProps = (state, ownProps) => {
  $.ajax({
    method:'GET',
    url: '/rest/store/'+ownProps.params.url_key,
    dataType: 'json',
  })
    .done((response => {
      debugger
      return response
    }))
    .fail((response => {
      //make a 500 page
    }))
}

const StorePageHandler = connect(
  mapStateToProps
)(StorePage)

export default StorePageHandler