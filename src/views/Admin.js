import React, { Component } from 'react';
import { connect } from 'react-redux'
import Pages from './Pages'
import {getAdmin} from '../actions'
class Admin extends Component {
  componentWillMount() {    
    this.props.dispatch(getAdmin())
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
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins == null ? '' : admins.map(x => {
                      return (
                        <tr key={x.id}>
                          <td>{x.loginName}</td>
                          <td>{x.realName}</td>
                          <td>{x.regDate}</td>
                          <td>删除</td>
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
  return {admin}
}


Admin = connect(
  mapStateToProps
)(Admin)
export default Admin;


