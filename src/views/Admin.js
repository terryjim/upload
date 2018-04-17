import React, { Component } from 'react';
import { connect } from 'react-redux'
import Pages from './Pages'
import { getAdmin, saveAdmin, getAdminInfo } from '../actions/admin'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import AdminForm from './forms/AdminForm'
import SubmitValidationForm from './forms/SubmitValidationForm'
import TopModal from '../components/TopModal'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
/* let columns = [{
  dataField: 'id',
  text: 'id',
 // hidden: true
 formatter:operator
}, {
  dataField: 'loginName',
  text: '登录名'
}, {
  dataField: 'realName',
  text: '用户名'
}, {
  dataField: 'regDate',
  text: '注册时间'
}, {
  dataField: 'id',
  text: '操作',
  formatter:(cell,row)=>(<div>{cell}+111</div>)
}];
let operator = (cell, row) => {
  alert(1);
  return (<div>{cell}+111</div>)
  }
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      alert(JSON.stringify(row));
    }
  }; */
  let operator = (cell, row) => {   
    return (<div>{cell+'hello!'}</div>)
    }
 
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
  modify = (cell, row) => {   
    return (<div><Button color="primary" size="sm" onClick={(e) => { e.stopPropagation(); this.props.dispatch(getAdminInfo(row)); this.setState({ showEditUser: true }) }}>修改</Button></div>)
    }
  columns = [{
    dataField: 'id',
    text: 'id',
    hidden: true    
  }, {
    dataField: 'loginName',
    text: '登录名'
  }, {
    dataField: 'realName',
    text: '用户名',
    //formatter:this.modify
  }, {
    dataField: 'regDate',
    text: '注册时间',
   /*  events: {
      onClick: (cell, row) => alert(cell)
    } */
  }, {
    dataField: '',
    text: '操作',
    formatter:this.modify
    //formatter: (cell, row) => (<div><Button color="primary" size="sm" onClick={(e) => { e.stopPropagation(); this.props.dispatch(getAdminInfo(row)); this.setState({ showEditUser: true }) }}>修改</Button></div>)
  }];
  options = {
    onSizePerPageChange: (sizePerPage, page) => {
      console.log('Size per page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    },
    onPageChange: (page, sizePerPage) => {
      console.log('Page change!!!');
      console.log('Newest size per page:' + sizePerPage);
      console.log('Newest page:' + page);
    }
  };
  rowEvents = {
    onClick: (e, row, rowIndex) => {
      alert(JSON.stringify(row));
    }
  };
  render() {
    let admins = this.props.admin
    return (
      <div className="animated fadeIn">
        <BootstrapTable keyField='id' data={admins} columns={this.columns} striped
          hover condensed insertRow rowEvents={this.rowEvents} />

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
  console.log('###########################33')
  console.log(admin)
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
