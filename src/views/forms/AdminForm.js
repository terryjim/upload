import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
const validate = values => {
  const errors = {}
  if (!values.loginName) {
    errors.loginName = '登录名不能为空'
  }
  if (!values.realName) {
    errors.realName = '用户名不能为空'
  } /* else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  } */
  /*  if (!values.age) {
     errors.age = '年龄不能为空'
   } else if (isNaN(Number(values.age))) {
     errors.age = '年龄必须是一个数字'
   } else if (Number(values.age) < 18) {
     errors.age = '对不起，你未满18岁'
   } */
  return errors
}

const warn = values => {
  const warnings = {}
 /*  if (values.loginName.length() >10) {
    warnings.loginName = '你年龄还有点小哦！'
  } */
  return warnings
}

{/* <div>
        <label>真实姓名</label>
        <div>
          <Field
            name="realName"
            component="renderField"
            type="text"
            placeholder="真实姓名"
          />
        </div>
      </div> */}

      const renderField = ({ input, label, type, meta: { touched, error } }) => (
        <div>
          <label>{label}</label>
          <div>
            <input {...input} placeholder={label} type={type} />
            {touched && error && <span>{error}</span>}
          </div>
        </div>
      )

let AdminForm = props => { 
  const {error,handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit} >
      <Field name="id"  component={renderField} type="text" label="id"/>
      {/* <FormGroup>
        <InputGroup>
          <InputGroupAddon >登录名称</InputGroupAddon>          
          <Field name="loginName" component="Input" type="text" />
          <InputGroupAddon><i className="fa fa-user"></i></InputGroupAddon>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup>
          <InputGroupAddon >真实姓名</InputGroupAddon>         
          <Field name="realName" component="input" type="text" />
          <InputGroupAddon><i className="fa fa-user"></i></InputGroupAddon>
        </InputGroup>
      </FormGroup>

      <FormGroup className="form-actions">
        <button type="submit"  disabled={pristine || submitting} >保存</button>&nbsp;&nbsp;
                    <Button  disabled={pristine || submitting} onClick={reset} color="secondary">取消</Button>
                   
      </FormGroup> */}
        {/*  <div>
        <label>登录名称</label>
        <div> */}
          <Field
            name="loginName"
            component={renderField}
            type="text"
            label="登录名称"
          />
       {/*  </div>
      </div>
      <div>
        <label>真实姓名</label>
        <div> */}
          <Field
            name="realName"
            component={renderField}
            type="text"
            label="真实姓名"
          />
          
       {/*  </div>
      </div> */}
      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={pristine || submitting}>
          提交
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          重置还原
        </button>
      </div>
    


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





// Decorate the form component
AdminForm = reduxForm({
  form: 'admin', // a unique name for this form
  validate,                // 上面定义的一个验证函数，使redux-form同步验证
  warn
})(AdminForm);
AdminForm = connect(
  state => ({
    initialValues: state.adminForm.data // pull initial values from account reducer
  }),
  // { load: loadAccount } // bind account loading action creator
)(AdminForm)
export default AdminForm;