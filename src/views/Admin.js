import React, { Component } from 'react';
import { connect } from 'react-redux'
import Pages from './Pages'
import { getAdmin,saveAdmin } from '../actions'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import AdminForm from './forms/AdminForm'
class Admin extends Component {
  componentWillMount() {
    this.props.dispatch(getAdmin())
  }
  constructor(props) {
    super(props);
    this.state = {
      showEditUser: false,
    };
    // this.toggleShowEditUser = this.toggleShowEditUser.bind(this);
  }
  toggleShowEditUser() {
    this.setState({
      showEditUser: !this.state.showEditUser,
    });
  }
  bindData(x) {
    this.setState({
      loginName: x.loginName,
      realName: x.realName,
      showEditUser: !this.state.showEditUser
    });
   
  }
  submit = (values) => {
    // Do something with the form values
    console.log(values);
    this.props.dispatch(saveAdmin(JSON.stringify(values)))
    this.setState({showEditUser:false})
  }
  render() {
    let admins = this.props.admin
    return (
      <div className="animated fadeIn">


        <div className="row">

          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> 管理员设置
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped" >
                  <thead>
                    <tr>
                      <th>登录名</th>
                      <th>用户名</th>
                      <th>注册时间</th>
                      <th>操作{this.state.realName}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins == null ? '' : admins.map(x => {
                      return (
                        <tr key={x.id}>
                          <td>{x.loginName}</td>
                          <td>{x.realName}</td>
                          <td>{x.regDate}</td>
                          <td>删除<Button color="primary" onClick={() => this.bindData(x)}>修改</Button>
                            <Modal isOpen={this.state.showEditUser} toggle={() => this.toggleShowEditUser()}
                              className={'modal-primary ' + this.props.className}>
                              <ModalHeader toggle={() => this.toggleShowEditUser()}>修改用户</ModalHeader>
                              <ModalBody>
                                <Form action="" method="post" onSubmit={(e) => this.handleSubmit(e)}>
                                  <FormGroup>
                                    <InputGroup>
                                      <InputGroupAddon >登录名称</InputGroupAddon>
                                      <Input type="text" id="loginName" name="loginName" value={this.state.loginName} />
                                      <InputGroupAddon><i className="fa fa-user"></i></InputGroupAddon>
                                    </InputGroup>
                                  </FormGroup>
                                  <FormGroup>
                                    <InputGroup>
                                      <InputGroupAddon >真实姓名</InputGroupAddon>
                                      <Input type="text" id="realName" name="realName" value={this.state.realName} />
                                      <InputGroupAddon><i className="fa fa-user"></i></InputGroupAddon>
                                    </InputGroup>
                                  </FormGroup>

                                  <FormGroup className="form-actions">
                                    <Button type="submit" color="primary">保存</Button>&nbsp;&nbsp;
                    <Button onClick={() => this.toggleShowEditUser()} color="secondary">取消</Button>
                                  </FormGroup>
                                </Form>
                                <AdminForm onSubmit={this.submit} />
                              </ModalBody>
                              {/*   <ModalFooter>
                                <Button color="primary" onClick={this.toggleShowEditUser}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={this.toggleShowEditUser}>Cancel</Button>
                              </ModalFooter> */}
                            </Modal></td>
                        </tr>
                      )

                    })}


                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>


      </div>

    )
  }
}
const mapStateToProps = (state) => {
  let admin = state.admin
  return { admin }
}


Admin = connect(
  mapStateToProps
)(Admin)
export default Admin;

const bindData = (x) => {
  this.setState({
    realName: x.realName,
    loginName: x.loginName
  }
  )
  this.toggleShowEditUser()
}
