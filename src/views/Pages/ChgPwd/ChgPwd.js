import React, { Component } from 'react';
import { connect } from 'react-redux'
import {fetchChgPwd } from '../../../actions/'
class ChgPwd extends Component {
  componentDidUpdate() {   
    if (this.props.chgPwdSuccess!=null&&this.props.chgPwdSuccess===1) {    
      this.props.history.replace('/login')
    }
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  <h1>修改密码</h1>
                  <p className="text-muted">Modify your password</p>                 
                    <input type="hidden" className="form-control" value={this.props.userName}/>                
                  <div className="input-group mb-3">
                    <span className="input-group-addon"><i className="icon-user"></i></span>
                    <input type="password" className="form-control" placeholder="老密码 Old password" ref={oldPwd => this.oldPwd = oldPwd}/>
                  </div>
                 
                  <div className="input-group mb-3">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" className="form-control" placeholder="新密码 New password" ref={newPwd => this.newPwd = newPwd}/>
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-addon"><i className="icon-lock"></i></span>
                    <input type="password" className="form-control" placeholder="确认密码 Repeat password" ref={confirmPwd => this.confirmPwd = confirmPwd}/>
                  </div>
                  <button type="button" className="btn btn-block btn-success" onClick={() => {
                    if (this.oldPwd.value == '') {
                            alert('请输入老密码！')
                            return null
                          }
                          if (this.newPwd.value == ''||this.confirmPwd.value=='') {
                            alert('请输入新密码！')
                            return null
                          }
                          if (this.newPwd.value !=this.confirmPwd.value) {
                            alert('两次输入密码不一致，请重新输入！')
                            return null
                          }
                         
                          this.props.onChgPwd({ userName: this.props.userName,oldPwd:this.oldPwd.value , newPwd:this.newPwd.value})
                        }}>确定</button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  let user = state.user
  let userName=user==null?'':user.userName
  let chgPwdSuccess=state.chgPwdSuccess
  return { userName,chgPwdSuccess}
}
const mapDispatchToProps = {
  onChgPwd:fetchChgPwd
}

ChgPwd = connect(
  mapStateToProps,mapDispatchToProps
)(ChgPwd)
export default ChgPwd;
