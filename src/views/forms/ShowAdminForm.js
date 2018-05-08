import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'



let ShowAdminForm = props => {
  const { dispatch, error, handleSubmit, pristine, reset, submitting } = props;
  return (
    <form >
      <Field name="id" component="input" type="hidden" label="id" />
      <div>
        <label>登录名称</label>
        <div>
          <Field readOnly = "true"
            name="realName"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div>
        <label>真实姓名</label>
        <div>
          <Field readOnly = "true" 
            name="loginName"
            component="input"
            type="text"
          />
        </div>
      </div>
      <div>
        <label>注册时间</label>
        <div>
          <Field readOnly = "true" 
            name="regDate"
            component="input"
            type="text"
          />
        </div>
      </div>

    </form>
  );
}





// Decorate the form component
ShowAdminForm = reduxForm({
  form: 'admin', // a unique name for this form
 
})(ShowAdminForm);
ShowAdminForm = connect(
  state => ({
    initialValues: state.cForm.data // pull initial values from account reducer
  }),
  // { load: loadAccount } // bind account loading action creator
)(ShowAdminForm)
export default ShowAdminForm;