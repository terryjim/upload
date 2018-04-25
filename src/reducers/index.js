import { combineReducers } from 'redux'
/* import { reducer as formReducer } from 'redux-form' */
import user from './user'
import sms from './sms'
import pages from './pages'
import stat from './stat'
import chgPwdSuccess from './chgPwdSuccess'
import admins from './admins'
import adminForm from './adminForm'
import editedIds from './editedIds'
import err from './err'
import success from './success'
import confirm from './confirm'
import { reducer as formReducer } from 'redux-form'
// export default combineReducers({user,form:formReducer,sms})
export default combineReducers({confirm,editedIds, user, sms, pages, stat, chgPwdSuccess, admins, form: formReducer, adminForm, err, success })

