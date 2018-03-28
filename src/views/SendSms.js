import React, { Component } from 'react';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {sendSms} from '../actions'
import { connect } from 'react-redux'
class SendSms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tels:'',
      content:'【湖北城建职院】',   
    };
  }
handleValueChange  = (field, value)=> { 
  this.setState({[field]: value});
}
  handleSubmit= (e)=> {
    // 阻止表单submit事件自动跳转页面的动作
    e.preventDefault()
    /* let reg = /^1[0-9]{10}((,|;|\s)+1[0-9]{10})*$/;      */
    let reg = /^1[0-9]{10}(,+1[0-9]{10})*$/;     
    if(!reg.test(this.state.tels)){
      alert('手机号码格式不正确!')
      return
    }
    this.props.dispatch(sendSms(JSON.stringify(this.state)))
    //alert(JSON.stringify(this.state))
  }
  render() {
     const {tels,content} = this.state
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-sm-12">

             <form  className="col-sm-12"  onSubmit={(e) => this.handleSubmit(e)}>
               <div className="card">              
              <div className="card-header">
                <strong>短信发送</strong> <small> 录入</small>
              </div>
             
              <div className="card-block">
                
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="tels">手机号码</label>
                      <textarea value={tels} onChange={(e) => this.handleValueChange('tels', e.target.value)}  rows="9" className="form-control" ></textarea>
                      <span className="help-block">*多个号码之间请用英文逗号分隔*</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="name">短信内容</label>
                      <textarea  value={content} onChange={(e) => this.handleValueChange('content', e.target.value)} rows="9" className="form-control" ></textarea>
                      <span className="help-block">*短信发送格式:内容+签名【   】，禁发词汇 [ ]*</span>
                    </div>
                  </div>
                 
                </div>
 
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-sm btn-primary"><i className="fa fa-dot-circle-o"></i> 发送</button>
              </div>
            </div></form>
          </div>

        </div>

      </div>
    )
  }
}
SendSms = connect(
    
)(SendSms)
export default SendSms;
