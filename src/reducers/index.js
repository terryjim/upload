import { combineReducers } from 'redux'
/* import { reducer as formReducer } from 'redux-form' */
import user from './user'
import sms from './sms'
import pages from './pages'
import stat from './stat'
import chgPwdSuccess from './chgPwdSuccess'
import admin from './admin'
import adminForm from './adminForm'
import modifiedIds from './modifiedIds'
import err from './err'
import success from './success'
import { reducer as formReducer } from 'redux-form'
// export default combineReducers({user,form:formReducer,sms})
export default combineReducers({ modifiedIds, user, sms, pages, stat, chgPwdSuccess, admin, form: formReducer, adminForm, err, success })

