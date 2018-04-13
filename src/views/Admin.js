import React, { Component } from 'react';
import { connect } from 'react-redux'
import Pages from './Pages'
import { getAdmin, saveAdmin, getAdminInfo } from '../actions/admin'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import AdminForm from './forms/AdminForm'
import SubmitValidationForm from './forms/SubmitValidationForm'
import TopModal from '../components/TopModal'
import ReactTable from 'react-table'
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
  /*  bindData(x) {
     this.setState({
       loginName: x.loginName,
       realName: x.realName,
       showEditUser: !this.state.showEditUser
     });
    
   } */
  submit = (values) => {
    // Do something with the form values    
    console.log(values);
    this.props.dispatch(saveAdmin(JSON.stringify(values)))
    this.setState({ showEditUser: false })
  }
  render() {
    let admins = this.props.admin
    return (
      <div className="animated fadeIn">
        <ReactTable data={admins} columns={[{
          Header: "登录名",
          accessor: "loginName"
        }, {
          Header: "用户名",
          accessor: "realName"
        }, {
          Header: "注册时间",
          accessor: "regDate"
        }, {
          Header: "操作",
          accessor: "loginName",
          Cell: row => admins
        },]} defaultPageSize={10}
          className="-striped -highlight" />

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
                    {admins == null || admins.length < 1 ? '' : admins.map(x => {
                      return (
                        <tr key={x.id}>
                          <td>{x.loginName}</td>
                          <td>{x.realName}</td>
                          <td>{x.regDate}</td>
                          <td><Button color="danger" size="sm">删除</Button> <Button color="primary" size="sm" onClick={() => { this.props.dispatch(getAdminInfo(x)); this.setState({ showEditUser: true }) }}>修改</Button>
                          </td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
                <TopModal isOpen={this.state.showEditUser} toggle={() => this.toggleShowEditUser()}
                  className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={() => this.toggleShowEditUser()}>修改用户</ModalHeader>
                  <ModalBody>
                    <AdminForm onSubmit={this.submit} />
                  </ModalBody>
                  {/*   <ModalFooter>
                                <Button color="primary" onClick={this.toggleShowEditUser}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={this.toggleShowEditUser}>Cancel</Button>
                              </ModalFooter> */}
                </TopModal>
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
