import React, { Component } from 'react';
import { Field, reduxForm,change} from 'redux-form';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { showError } from '../../actions/common'

import DropzoneComponent from 'react-dropzone-component'
import 'react-dropzone-component/styles/filepicker.css'
import 'dropzone/dist/min/dropzone.min.css'


const componentConfig = {
  // iconFiletypes: ['.jpg', '.png', '.gif'],
  showFiletypeIcon: true,
  postUrl: 'http://bluechips.oss-cn-hangzhou.aliyuncs.com',

}
let uploading = false//上传状态
let uploadFiles = "" //上传文件列表
const validate = values => {
  const errors = {}
  if (!values.loginName) {
    errors.loginName = '登录名不能为空'
  }
  if (!values.realName) {
    errors.realName = '用户名不能为空'
  }
  if (uploading) {
    errors.uploading_oss_flag = '文件正在上传中，请稍后再试或取消文件上传'
  }
  //values.files=uploadFiles
      /* else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
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

let EditAdminForm = props => {
  const {values,dispatch, error, handleSubmit, pristine, reset, submitting, oss } = props;
  const djsConfig = {
    addRemoveLinks: true,
    //uploadMultiple:false,
    method: "post",
    //paramName:"multipartFiles",
    //acceptedFiles: "image/jpeg,image/png,image/gif",
    params: {
      "key": oss.dir + "${filename}", ...oss
    }
  }
  /*  "accessid": oss.accessid,
   "OSSAccessKeyId": oss.OSSAccessKeyId,
   "policy": oss.policy,
   "signature":oss.signature,
   "dir": oss.dir,
   "host": oss.host,
   "expire": oss.expire */
  let eventHandlers = {
    //init: ()=>alert('init'),
    // All of these receive the event as first parameter:
    //drop: ()=>alert('drop'),
    //dragstart: ()=>alert('dragstart'),
    //dragend: ()=>alert('dragend'),
    //dragenter: ()=>alert('dragenter'),
    //dragover: ()=>alert('dragover'),
    //dragleave:()=>alert('dragleave'),
    // All of these receive the file as first parameter:
    //addedfile: () => uploading = true,
    addedfile:(file) => {
     /*  if (uploadFiles === ''){
        uploadFiles = file.name
      }
      else
        uploadFiles += ',' + file.name   
        dispatch(change('admin', 'files', uploadFiles)) */
     
       // values.files=uploadFiles
       // EditAdminForm.validate(EditAdminForm.values)
    },
    removedfile: () => alert('removedfile'),
    thumbnail: () => alert('thumbnail'),
    error: () => alert('文件上传失败'),
    processing: () => alert('processing'),
    // uploadprogress: ()=>alert('uploadprogress'),  
    success: (file) => {
      uploadFiles === ''?uploadFiles = file.name:uploadFiles += ',' + file.name 
      dispatch(change('admin', 'files', uploadFiles))   
    },
    complete: () => alert('complete'),
    canceled: () => alert('canceled'),
    maxfilesreached: () => alert('maxfilesreached'),
    maxfilesexceeded: () => alert('maxfilesexceeded'),
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: () => alert('processingmultiple'),
    sendingmultiple: () => alert('sendingmultiple'),
    successmultiple: () => alert('successmultiple'),
    completemultiple: () => alert('completemultiple'),
    canceledmultiple: () => alert('canceledmultiple'),
    // Special Events
    // totaluploadprogress: ()=>alert('totaluploadprogress'),
    reset: () => alert('reset'),
    sending: () => uploading = true,
    queuecomplete: () => {uploading = false,alert(uploading)}


  }
  return (
    <form onSubmit={handleSubmit} >
      <Field name="id" component="input" type="hidden" label="id" />
      <Field
        name="loginName"
        component={renderField}
        type="text"
        label="登录名称"
      />

      <Field
        name="realName"
        component={renderField}
        type="text"
        label="真实姓名"
      />
      <Field
        name="uploading_oss_flag"
        component={renderField}
        type="hidden"
        label="附件上传"
      />


      <DropzoneComponent config={componentConfig}
        /*  eventHandlers={eventHandlers} */
        djsConfig={djsConfig}
        eventHandlers={eventHandlers}
      />
      {error && <strong>{error}</strong>}

      <Field name="files" component="input" type="test" label="files"/>
      <div>
        <button type="submit" disabled={pristine || submitting || !uploading}>
          提交
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          重置还原
        </button>
        <button type="button" onClick={() => dispatch(showError('err!!!!!!!'))}>
          错误
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
EditAdminForm = reduxForm({
  form: 'admin', // a unique name for this form
  validate,                // 上面定义的一个验证函数，使redux-form同步验证
  warn
})(EditAdminForm);
EditAdminForm = connect(
  state => ({
    initialValues: state.adminForm.data, // pull initial values from account reducer
    oss: state.oss,
  }),
  // { load: loadAccount } // bind account loading action creator
)(EditAdminForm)
export default EditAdminForm;