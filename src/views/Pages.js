import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSmsByPage } from '../actions'
/* import {fetchPages} from '../actions' */
class Pages extends Component {
  /*  componentWillMount() {   
      this.props.dispatch(fetchPages())   
  } */
  render() {
    console.debugger
    let firstPage = this.props.currentPage - 4
    if (firstPage < 1)
      firstPage = 1
    let lastPage = firstPage + 9
    if (lastPage > this.props.totalPages)
      lastPage = this.props.totalPages
    let pageArray = new Array()
    for (let i = firstPage; i <= lastPage; i++) {
      pageArray.push(i)
    }
    return (

      <ul className="pagination">
        <li className="page-item"><a className="page-link" href="javascript:void(0)" onClick={()=> this.props.onChangePage(this.props.currentPage > 1 ? this.props.currentPage - 1 : 1)}>Prev</a></li>
        {
          pageArray.map(x => {
            if (x === this.props.currentPage) {
              return (
                <li className="page-item active">
                  <a className="page-link" href="javascript:void(0)" onClick={ ()=>this.props.onChangePage((x))}>{x}</a>
                </li>
              )
            } else {
              return (
                <li className="page-item"><a className="page-link" href="javascript:void(0)" onClick={()=>this.props.onChangePage((x))}>{x}</a></li>
              )
            }
          })
        }
        <li className="page-item"><a className="page-link" href="javascript:void(0)" onClick={()=> this.props.onChangePage((this.props.currentPage < this.props.totalPages ? this.props.currentPage + 1 : this.props.totalPages))}>Next</a></li>
      </ul>


    )
  }
}
/* const mapStateToProps = (state) => {
  return { total: state.pages.total, currentPage: state.pages.currentPage }
}


Pages = connect(
  mapStateToProps
)(Pages) */
export default Pages;
