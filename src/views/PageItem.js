import React, { Component } from 'react';
import { connect } from 'react-redux'
class PageItem extends Component {
  render() {
    let firstPage = Math.floor((this.props.currentPage - 1) / 10) * 10 + 1
    let lastPage = Math.floor((this.props.currentPage - 1) / 10) * 10 + 10
    lastPage = lastPage < this.props.total ? lastPage : this.props.total
    let li = ''
    for (let i = firstPage; i <= lastPage; i++) {
      if (i === this.props.currentPage) {
        li += `<li className="page-item active">
          <a className="page-link" href="#">1</a>
          </li>`    } else {
        li += '<li className="page-item"><a className="page-link" href="#">Prev</a></li>'
      }
    }
    return (

      <ul className="pagination">
        {li}
      </ul>


    )
  }
}
const mapStateToProps = (state) => {
  return {total:state.pages.total,currentPage:state.pages.currentPage}
}


PageItem = connect(
  mapStateToProps
)(PageItem)
export default PageItem;
