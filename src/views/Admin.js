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
  return (<div>{cell + 'hello!'}</div>)
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
    this.props.dispatch(saveAdmin(values))
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
    formatter: this.modify
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
  rowStyle = (row, rowIndex) => {
    //修改或添加后的记录着色标注
    const style = {};
    /* if (row.id > 10) {
      style.backgroundColor = '#c8e6c9';
    } else {
      style.backgroundColor = '#00BFFF';
    }  */
    //alert(this.props.modifiedIds)
    if (this.props.admin.modifiedIds!=undefined)
    
    if ((this.props.admin.modifiedIds!=undefined) && this.props.admin.modifiedIds.indexOf(row.id) > -1){
      alert(this.props.admin.modifiedIds.indexOf(row.id))
      style.backgroundColor = '#c8e6c9';
    }
    /*   if (rowIndex > 2) {
        style.fontWeight = 'bold';
        style.color = 'white';
      } */
    return style;
  };
  render() {
    let admins = this.props.admin
    return (
      <div className="animated fadeIn">
        <Button color="primary" size="sm" onClick={() => { this.props.dispatch(getAdminInfo(null)); this.setState({ showEditUser: true }) }}>新增</Button>
        <BootstrapTable keyField='id' data={admins} columns={this.columns} striped
          hover condensed insertRow rowEvents={this.rowEvents} rowStyle={this.rowStyle} />

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
                    {admins.list == null || admins.list.length < 1 ? '' : admins.list.map(x => {
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
//获取admin记录集及修改记录ＩＤ数组
const mapStateToProps = (state) => {
  let admin = state.admin
  let modifiedIds = state.modifiedIds
  console.log('###########')
  console.log(admin)
  console.log(modifiedIds)
  return { admin, modifiedIds }
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
