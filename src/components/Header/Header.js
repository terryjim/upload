import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom'
class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" onClick={this.mobileSidebarToggle}>&#9776;</button>
        {/* <a className="navbar-brand" href="#"></a> */}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;湖北城建职院短信平台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <button className="nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarToggle}>&#9776;</button>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="#">Dashboard</a>
          </li>

        </ul>
        <ul className="nav navbar-nav ml-auto">
          {/*  <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#"><i className="icon-bell"></i><span className="badge badge-pill badge-danger">5</span></a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#"><i className="icon-list"></i></a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#"><i className="icon-location-pin"></i></a>
          </li> */}
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <button onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <img src={'img/avatars/8.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                <span className="d-md-down-none">admin</span>
              </button>

              <DropdownMenu className="dropdown-menu-right">

                <DropdownItem>
                  <NavLink to={'/chgPwd'} className="nav-link" ><i className="fa fa-wrench"></i> 修改密码</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink to={'/login'} className="nav-link" ><i className="fa fa-lock"></i> 退出</NavLink>
                </DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </li>
          {/* <li className="nav-item d-md-down-none">
            <button className="nav-link navbar-toggler aside-menu-toggler" type="button" onClick={this.asideToggle}>&#9776;</button>
          </li> */}
        </ul>
      </header>
    )
  }
}

export default Header;
