import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to={'/dashboard'} className="nav-link" activeClassName="active"><i className="icon-speedometer"></i> Dashboard <span className="badge badge-info">NEW</span></NavLink>
            </li>
            
         
         
             <li className="nav-item">
              <NavLink to={'/sendSms'} className="nav-link" activeClassName="active"><i className="icon-star"></i> 待审核照片 </NavLink>
            </li>
             <li className="nav-item">
              <NavLink to={'/smsSent'} className="nav-link" activeClassName="active"><i className="icon-calculator"></i> 退回照片 </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/sendSms'} className="nav-link" activeClassName="active"><i className="icon-star"></i> 已审核照片 </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/admin'} className="nav-link" activeClassName="active"><i className="icon-star"></i> 管理员设置 </NavLink>
            </li>
          
            
            
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
