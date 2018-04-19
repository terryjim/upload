import React, { Component } from 'react';
import { connect } from 'react-redux'
import Pages from './Pages'
import { getAdmin, saveAdmin, getAdminInfo } from '../actions/admin'
import { clearEditedIds } from '../actions/common'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import AdminForm from './forms/AdminForm'
import SubmitValidationForm from './forms/SubmitValidationForm'
import TopModal from '../components/TopModal'
import BootstrapTable from 'react-bootstrap-table-next';
/* import paginationFactory from 'react-bootstrap-table2-paginator';
import paginator from 'react-bootstrap-table2-paginator'; */
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

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};
class Admin extends Component {
  componentWillMount() {
    this.props.dispatch(clearEditedIds())
    this.props.dispatch(getAdmin())
  }
  constructor(props) {
    super(props);
    this.state = {
      showEditUser: false,
      showDanger:false
    };


    // this.toggleShowEditUser = this.toggleShowEditUser.bind(this);
  }

  toggleShowEditUser=()=> {
    this.setState({
      showEditUser: !this.state.showEditUser,
    });
  }
  toggleShowDanger=()=> {
    this.setState({
      showDanger: !this.state.showDanger,
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
  operator2 = (cell, row) => {
    return (<div>      
      <a className="fa fa-edit fa-lg mt-4" onClick={(e) => {
          e.stopPropagation(); this.props.dispatch(getAdminInfo(row));
          this.setState({ showEditUser: true })
        }}></a> <a className="fa fa-trash-o fa-lg mt-4" onClick={e=>{e.stopPropagation();this.toggleShowDanger()}}></a>
      <Button color="primary" size="sm"
        onClick={(e) => {
          e.stopPropagation(); this.props.dispatch(getAdminInfo(row));
          this.setState({ showEditUser: true })
        }}>修改</Button>　
        <Button color="danger"  size="sm"
        onClick={e=>{e.stopPropagation();this.toggleShowDanger()}}>删除</Button>
        
        </div>)
  }
  operator = (cell, row) => {
    return (<div>      
      <a className="fa fa-edit fa-lg mt-4" onClick={(e) => {
          e.stopPropagation(); this.props.dispatch(getAdminInfo(row));
          this.setState({ showEditUser: true })
        }}></a> <a className="fa fa-trash-o fa-lg mt-4" onClick={e=>{e.stopPropagation();this.toggleShowDanger()}}></a>
       </div>)
  }
  columns = [{
    dataField: 'id',
    text: 'id',
    hidden: true
  }, {
    dataField: '',
    text: '',
    formatter: this.operator,
    style: {'width':'100px',backgroundColor: 'green' }
    //formatter: (cell, row) => (<div><Button color="primary" size="sm" onClick={(e) => { e.stopPropagation(); this.props.dispatch(getAdminInfo(row)); this.setState({ showEditUser: true }) }}>修改</Button></div>)
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
    formatter: this.operator2
    //formatter: (cell, row) => (<div><Button color="primary" size="sm" onClick={(e) => { e.stopPropagation(); this.props.dispatch(getAdminInfo(row)); this.setState({ showEditUser: true }) }}>修改</Button></div>)
  }];

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
    //alert(this.props.editedIds)

    if ((this.props.editedIds != undefined) && this.props.editedIds.indexOf(row.id) > -1) {
      style.backgroundColor = '#c8e6c9';

    }
    /*   if (rowIndex > 2) {
        style.fontWeight = 'bold';
        style.color = 'white';
      } */
    return style;
  };
  render() {
    let admins = this.props.admins
    return (
      <div className="animated fadeIn">
        <Button color="primary" size="sm" onClick={() => { this.props.dispatch(getAdminInfo(null)); this.setState({ showEditUser: true }) }}>新增</Button>
        <BootstrapTable keyField='id' data={admins} columns={this.columns} striped
          hover condensed insertRow rowStyle={this.rowStyle} selectRow={selectRow} />

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
                <TopModal isOpen={this.state.showDanger} toggle={() => this.toggleShowDanger()}
                  className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={() => this.toggleShowDanger()}>删除记录</ModalHeader>
                  <ModalBody>
                    您是否确定要删除选中的记录？
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={this.toggleShowDanger}>确定</Button>{' '}
                    <Button color="secondary" onClick={this.toggleShowDanger}>取消</Button>
                  </ModalFooter>
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
  let admins = state.admins
  let editedIds = state.editedIds
  return { admins, editedIds }
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
