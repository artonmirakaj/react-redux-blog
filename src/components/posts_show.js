import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

// receiving new posts
class PostsShow extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  // action creator
  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    // check if we have data
    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {/* take back to index */}
        <Link to="/" className="btn btn-primary">Back To Index</Link>

        {/* delete post */}
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
          >
          Delete Post
        </button>

        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}


// ownProps - set of props going to target component
function mapStateToProps({ posts }, ownProps) {
  // receive single post, not list
  return { post: posts[ownProps.match.params.id] };
}



export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
