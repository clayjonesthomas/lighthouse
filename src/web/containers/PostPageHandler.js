import $ from 'jquery'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import PostPage from '../components/PostPage'

const mapStateToProps = (state, ownProps) => {
  $.ajax({
    method:'GET',
    url: '/rest/post/'+ownProps.params.url_key,
    dataType: 'json',
  })
    .done((response => {
      return response
    }))
    .fail((response => {
      //make a 500 page
    }))
}

const PostPageHandler = connect(
  mapStateToProps
)(PostPage)

export default PostPageHandler