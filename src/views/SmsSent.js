import React, { Component } from 'react';
import { connect } from 'react-redux'
import Pages from './Pages'
import {getSmsByPage} from '../actions'
class SmsSent extends Component {
  componentWillMount() {
    this.props.dispatch(getSmsByPage(1))
  }

  render() {
    let sms = this.props.sms
    console.log(sms)
        return (
      <div className="animated fadeIn">


        <div className="row">

          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> 短信发送记录
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped" >
                  <thead>
                    <tr>
                      <th>内容</th>
                      <th>发送时间</th>
                      <th>号码</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sms == null ? '' : sms.content.map(x => {
                      return (
                        <tr>
                          <td>{x.content}</td>
                          <td>{x.created}</td>
                          <td>{x.tels}</td>
                        </tr>
                      )

                    })}


                  </tbody>
                </table>
                <Pages totalPages={sms.totalPages} currentPage={sms.number+1} size={sms.size} totalElements={sms.totalElements} onChangePage={(page)=>this.props.dispatch(getSmsByPage(page))}/>
              </div>
            </div>
          </div>

        </div>


      </div>

    )
  }
}
const mapStateToProps = (state) => {
  let sms = state.sms
  return { sms }
}


SmsSent = connect(
  mapStateToProps
)(SmsSent)
export default SmsSent;
