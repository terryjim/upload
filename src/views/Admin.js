import React, { Component } from 'react';
import { connect } from 'react-redux'
import Pages from './Pages'
import { getAdmin, saveAdmin, getAdminInfo, delAdmins } from '../actions/admin'
import { showConfirm, closeConfirm } from '../actions/common'
import { clearEditedIds } from '../actions/common'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import ShowAdminForm from './forms/ShowAdminForm'
import EditAdminForm from './forms/EditAdminForm'
import TopModal from '../components/TopModal'
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";

//管理员主列表，增删改查
const CheckboxTable = checkboxHOC(ReactTable);
class Admin extends Component {
  componentWillMount() {
    //每次打开时清除页面修改痕迹
    this.props.dispatch(clearEditedIds())
    //获取分页列表
    // this.props.dispatch(getAdmin({ page: 0, size: 10 }))
  }
  componentWillReceiveProps(nextProps) {
    //确认删除记录操作
    //console.log(nextProps)
    if (nextProps.confirmDel) {
      console.log('#####################################################################333')
      this.props.dispatch(delAdmins(this.state.selection))
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      showEditAdmin: false,//显示修改表单
      showDanger: false,   //显示错误信息
      showAdmin: false,
      selection: [],
      selectAll: false,
    };
  }
  toggleSelection = (key, shift, row) => {
    /* 
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    let selection = [...this.state.selection];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ];
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  };

  toggleAll = () => {
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original.id);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  };
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
    filterable: false,
    Cell: (c) => (<div>
      <a className="fa fa-edit fa-lg mt-4"
        onClick={
          (e) => {
            //e.stopPropagation()
            this.props.dispatch(getAdminInfo(c.row))　　/* 获取当前行信息填充到编辑表单 */
            this.setState({ showEditAdmin: true })
          }
        }>
      </a>
      <a className="fa fa-trash-o fa-lg mt-4"
        onClick={
          e => {
            // e.stopPropagation()
            this.props.dispatch(showConfirm('是否删除选中记录？', 'admin', 'del'))
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
    const { toggleSelection, toggleAll, isSelected } = this;
    const { selectAll } = this.state;
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
      /*  getTrProps: (s, r) => {
         // someone asked for an example of a background color change
         // here it is...
         const selected = this.isSelected(r.original._id);
         return {
           style: {
             backgroundColor: selected ? "lightgreen" : "inherit"
             // color: selected ? 'white' : 'inherit',
           }
         };
       } */
    };
    let admins = this.props.admins

    return (
      <div className="animated fadeIn">
        <Button color="primary" size="sm" onClick={() => { this.props.dispatch(getAdminInfo(null)); this.setState({ showEditAdmin: true }) }}>新增</Button>
        <Button color="danger" size="sm" onClick={() => { this.props.dispatch(showConfirm('是否删除选中记录？', 'admin', 'del')); }}>删除</Button>
        <CheckboxTable ref={r => (this.checkboxTable = r)} keyField='id' data={admins.content}
          pages={admins.totalPages} columns={this.columns} defaultPageSize={10} filterable
          className="-striped -highlight"
          /* onPageChange={(pageIndex) => this.props.dispatch(getAdmin({page:pageIndex,size:10}))}  */
          manual // Forces table not to paginate or sort automatically, so we can handle it server-side
          onFetchData={(state, instance) => {
            console.log('$$$$$$$$$$$$______________________')
            console.log(state)
            let whereSql = ''
            state.filtered.forEach(
              v => whereSql = whereSql + ' and ' + v.id + ' like \'%' + v.value + '%\''
            )
            this.props.dispatch(getAdmin({ whereSql, page: state.page, size: 10 }))
          }}
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
                },
                /* onClick: (e,handleOriginal)=>{
                  //alert(rowInfo.row.id)
                  this.setState({ selection: [rowInfo.row.id]})
                } */
              }
            }
          }
          {...checkboxProps}
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
                    <EditAdminForm onSubmit={this.submit}/>
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
  //console.log(admins)
  let editedIds = state.editedIds
  let confirmDel = state.confirm.module === 'admin' && state.confirm.operate === 'del' ? state.confirm.confirm : false
  return { admins, editedIds, confirmDel }
}


Admin = connect(
  mapStateToProps
)(Admin)
export default Admin;
