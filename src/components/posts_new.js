import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class PostsNew extends Component {

  renderField(field) {

    // de-structuring properties
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>

        <label>{field.label}</label>

        <input
          className="form-control"
          type="text"
          {...field.input}
        />

        <div className="text-help">
          {touched ? error: ''}
          {/* if user touched field, show error, otherwise show empty string */}
        </div>

      </div>
    );
  }


  onSubmit(values) {
    // navigating through callback
    // action creater
    this.props.createPost(values, () => {
      // navigate back to our list of posts, back to root router
      this.props.history.push('/');
    });
  }



  render() {

    // passed to component by reduxForm
    const { handleSubmit } = this.props;

    return (
      // run reduxForm side of things, if ready to be submitted
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

        <Field
          label="Title For Post"
          name="title"
          component={this.renderField}
        />

        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />

        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />

        <button type="submit" className="btn btn-primary">Submit</button>

        {/* When user clicks cancel, go back to root directory */}
        <Link to="/" className="btn btn-danger">Cancel</Link>

      </form>
    );
  }

}

//validate form to user
function validate(values) {
  const errors = {};
  //validate inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title * ";
  }
  if (!values.categories) {
    errors.categories = "Enter category * ";
  }
  if (!values.content) {
    errors.content = "Enter content * ";
  }
  // if errors is empty, form is fine to submit
  // if errors has any prooerties, redux form assumes form is invalid
  return errors;
}



export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
);
