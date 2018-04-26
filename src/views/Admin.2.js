import React, { Component } from 'react';
import { connect } from 'react-redux'
import Pages from './Pages'
import { getAdmin, saveAdmin, getAdminInfo } from '../actions/admin'
import { showConfirm } from '../actions/common'
import { clearEditedIds } from '../actions/common'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import ShowAdminForm from './forms/ShowAdminForm'
import EditAdminForm from './forms/EditAdminForm'
import TopModal from '../components/TopModal'
import ReactTable from "react-table";

//管理员主列表，增删改查
/*
let operator = (cell, row) => {
  alert(1);
  return (<div>{cell}+111</div>)
  }
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      alert(JSON.stringify(row));
    }
  }; */


class Admin extends Component {
  componentWillMount() {
    //每次打开时清除页面修改痕迹
    this.props.dispatch(clearEditedIds())
    //获取分页列表
    this.props.dispatch(getAdmin())
  }
  constructor(props) {
    super(props);
    this.state = {
      showEditAdmin: false,//显示修改表单
      showDanger: false,   //显示错误信息
      showAdmin: false,
    };


    // this.toggleShowEditAdmin = this.toggleShowEditAdmin.bind(this);
  }
  //切换编辑窗口状态（开、闭）
  toggleShowEditAdmin = () => {
    this.setState({
      showEditAdmin: !this.state.showEditAdmin,
    });
  }
  //切换查看窗口状态（开、闭）
  toggleShowAdmin = () => {
    this.setState({
      showAdmin: !this.state.showAdmin,
    });
  }
  //切换错误窗口状态（开、闭）  
  toggleShowDanger = () => {
    this.setState({
      showDanger: !this.state.showDanger,
    });
  }
  submit = (values) => {
    // Do something with the form values        
    this.props.dispatch(saveAdmin(values))
    this.setState({ showEditAdmin: false })
  }
  columns = [{
    accessor: 'id',
    Header: 'id',
    show: true,
    Cell: row => (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#dadada",
          borderRadius: "2px"
        }}
      >${row.value}
        <div
          style={{
            width: `{row.value}%`,
            height: "100%",
            backgroundColor:
              row.value > 10
                ? "#85cc00"
                : row.value > 50
                  ? "#ffbf00"
                  : "#ff2e00",
            borderRadius: "2px",
            transition: "all .2s ease-out"
          }}
        />
      </div>
    )
  }, {
    Header: '',
    sortable: false,
    width: 60,
    Cell: (c) => (<div>
      <a className="fa fa-edit fa-lg mt-4"
        onClick={
          (e) => {
            e.stopPropagation()
            this.props.dispatch(getAdminInfo(c.row))　　/* 获取当前行信息填充到编辑表单 */
            this.setState({ showEditAdmin: true })
          }
        }>
      </a> 
      <a className="fa fa-trash-o fa-lg mt-4"
        onClick={
          e => {
            e.stopPropagation()
            this.props.dispatch(showConfirm('是否删除选中记录？'))
          }
        }>
      </a>
    </div>)
  }, {
    accessor: 'loginName',
    Header: '登录名',

  }, {
    accessor: 'realName',
    Header: '用户名',
  }, {
    accessor: 'regDate',
    Header: '注册时间',
  }
  ];
  render() {
    let admins = this.props.admins
    //确认删除记录操作
    if(this.props.confirmDel){
alert('删除！！！')
    }
    return (
      <div className="animated fadeIn">
        <Button color="primary" size="sm" onClick={() => { this.props.dispatch(getAdminInfo(null)); this.setState({ showEditAdmin: true }) }}>新增</Button>
        <ReactTable keyField='id' data={admins.content} columns={this.columns} defaultPageSize={10}
          className="-striped -highlight"
          getTrProps={
            (state, rowInfo, column, instance) => {
              let style = {}
              if ((this.props.editedIds != undefined) && rowInfo != undefined && this.props.editedIds.indexOf(rowInfo.row.id) > -1) {
                style.background = '#c8e6c9';
              }
              return {
                style, onDoubleClick: (e, handleOriginal) => {
                  this.props.dispatch(getAdminInfo(rowInfo.row));
                  this.setState({ showAdmin: true })
                }
              }
            }
          }

        />
        <div className="row">

          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> 管理员设置
              </div>
              <div className="card-block">

                <TopModal isOpen={this.state.showEditAdmin} toggle={() => this.toggleShowEditAdmin()}
                  className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={() => this.toggleShowEditAdmin()}>修改用户</ModalHeader>
                  <ModalBody>
                    <EditAdminForm onSubmit={this.submit} />
                  </ModalBody>
                  {/*   <ModalFooter>
                                <Button color="primary" onClick={this.toggleShowEditAdmin}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={this.toggleShowEditAdmin}>Cancel</Button>
                              </ModalFooter> */}
                </TopModal>
                <TopModal isOpen={this.state.showAdmin} toggle={() => this.toggleShowAdmin()}
                  className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={() => this.toggleShowAdmin()}>查看记录</ModalHeader>
                  <ModalBody>
                    <ShowAdminForm />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggleShowAdmin}>确定</Button>
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
  let confirmDel=state.confirm.confirm
  return { admins, editedIds,confirmDel}
}


Admin = connect(
  mapStateToProps
)(Admin)
export default Admin;
