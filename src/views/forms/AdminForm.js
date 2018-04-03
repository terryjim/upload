import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';

class AdminForm extends Component {
  render() {
    const { handleSubmit, closeWindow } = this.props;
    return (
      <form onSubmit={handleSubmit}>
      <Field name="id" component="input" type="text" value="12"/>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon >登录名称</InputGroupAddon>
            {/* <Input type="text" id="loginName" name="loginName"  /> */}
            <Field name="loginName" component="input" type="text" />
            <InputGroupAddon><i className="fa fa-user"></i></InputGroupAddon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupAddon >真实姓名</InputGroupAddon>
            {/* <Input type="text" id="realName" name="realName"  /> */}
            <Field name="realName" component="input" type="text" />
            <InputGroupAddon><i className="fa fa-user"></i></InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <FormGroup className="form-actions">
          <Button type="submit" color="primary">保存</Button>&nbsp;&nbsp;
                    <Button onClick={() => this.closeWindow()} color="secondary">取消</Button>
        </FormGroup>
        {/*   <div>
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email"/>
        </div>
        <button type="submit">Submit</button> */}
      </form>
    );
  }
}




// Decorate the form component
AdminForm = reduxForm({
  form: 'admin' // a unique name for this form
})(AdminForm);

export default AdminForm;