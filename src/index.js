import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import reducers from './reducers'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// Containers
import Full from './containers/Full/'

// Views
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'
import ChgPwd from './views/Pages/ChgPwd/'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-table/react-table.css' 
const history = createBrowserHistory();
const store = createStore(reducers, undefined,
    compose(
        applyMiddleware(thunk),
        autoRehydrate()
    ))
ReactDOM.render(<Provider  store={store}>
  <HashRouter history={history}>
    <Switch>
      <Route exact path="/login" name="Login Page" component={Login}/>
      <Route exact path="/full" name="Full" component={Full}/>
      <Route exact path="/404" name="Page 404" component={Page404}/>
      <Route exact path="/500" name="Page 500" component={Page500}/>
      <Route exact path="/chgPwd" name="Page 500" component={ChgPwd}/>
      <Route path="/" name="Home" component={Full}/>
    </Switch>
  </HashRouter>
</Provider>, document.getElementById('root'))
