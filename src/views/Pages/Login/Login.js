import React, { Component } from 'react';
import { connect } from 'react-redux'
import { login,loginOut } from '../../../actions/'

class Login extends Component {
  componentWillMount(){
    this.props.onLoginOut()
  }
  componentDidUpdate() {   
    if (this.props.token != null && this.props.token != '') {    
      this.props.history.replace('/full')
    }
  }
  render() {    
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div className="card-block" onKeyUp={(e) => {
                    e.keyCode === 13 && this.btnLogin.click()
                  }}>
                    <h1>登录</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <div className="input-group mb-3"  >
                      <span className="input-group-addon"><i className="icon-user"></i></span>
                      <input type="text" className="form-control" placeholder="Username" ref={userName => this.userName = userName} />
                    </div>
                    <div className="input-group mb-4" >
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input type="password" className="form-control" placeholder="Password" ref={password => this.password = password} />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="button" className="btn btn-primary px-4" ref={btnLogin => this.btnLogin = btnLogin} onClick={() => {
                          if (this.userName.value == '') {
                            alert('请输入用户名')
                            return null
                          }
                          if (this.password.value == '') {
                            alert('请输入密码')
                            return null
                          }
                          this.props.onLogin({ userName: this.userName.value, password: this.password.value })
                        }}>登录</button>
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-primary px-4" onClick={() => { this.userName.value = ''; this.password.value = '' }}>取消</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-inverse card-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <div className="card-block text-center">
                    <div>
                      <p><img src={process.env.PUBLIC_URL + '/img/logo.jpg'} style={{ width: 80 + '%' }} /></p>
                      <h2>短信平台</h2>
                      {/*<button type="button" className="btn btn-primary active mt-3">Register Now!</button>*/}
                    </div>
                  </div>
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
  if (state.user == null)
    return { token: null }
  else
    return { token: state.user.token }
}

const mapDispatchToProps = {
  // toIndex:push('/index'),
  onLogin: login,
  onLoginOut:loginOut
}
Login = (connect(mapStateToProps,
  mapDispatchToProps
)(Login))
export default Login;
