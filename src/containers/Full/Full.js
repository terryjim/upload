import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/'
import Charts from '../../views/Charts/'
import Widgets from '../../views/Widgets/'
import Buttons from '../../views/Components/Buttons/'
import Cards from '../../views/Components/Cards/'
import Forms from '../../views/Components/Forms/'
import Modals from '../../views/Components/Modals/'
import SocialButtons from '../../views/Components/SocialButtons/'
import Switches from '../../views/Components/Switches/'
import Tables from '../../views/Components/Tables/'
import Tabs from '../../views/Components/Tabs/'
import FontAwesome from '../../views/Icons/FontAwesome/'
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/'
import { connect } from 'react-redux'
import SendSms from '../../views/SendSms'
import SmsSent from '../../views/SmsSent'
import Admin from '../../views/Admin'
class Full extends Component {
 /*  componentWillMount() {
    if (this.props.token == null || this.props.token == '') {
      this.props.history.replace('/login')
    }
  }
  componentWillUpdate() {
    if (this.props.token == null || this.props.token == '') {
      this.props.history.replace('/login')
    }
  } */
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                <Route path="/components/buttons" name="Buttons" component={Buttons} />
                <Route path="/components/cards" name="Cards" component={Cards} />
                <Route path="/components/forms" name="Forms" component={Forms} />
                <Route path="/components/modals" name="Modals" component={Modals} />
                <Route path="/components/social-buttons" name="Social Buttons" component={SocialButtons} />
                <Route path="/components/switches" name="Swithces" component={Switches} />
                <Route path="/components/tables" name="Tables" component={Tables} />
                <Route path="/components/tabs" name="Tabs" component={Tabs} />
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome} />
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons} />
                <Route path="/widgets" name="Widgets" component={Widgets} />
                <Route path="/charts" name="Charts" component={Charts} />
                <Route path="/sendSms" name="Charts" component={SendSms} />
                <Route path="/smsSent" name="Charts" component={SmsSent} />
                <Route path="/admin" name="管理员设置" component={Admin} />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </div>
          </main>
          <Aside />
        </div>
        <Footer />
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


Full = (connect(mapStateToProps)(Full))
export default Full;
