import { combineReducers } from 'redux'
/* import { reducer as formReducer } from 'redux-form' */
import user from './user'
import sms from './sms'
import pages from './pages'
import stat from './stat'
import chgPwdSuccess from './chgPwdSuccess'
import cList from './cList'
import cForm from './cForm'
import editedIds from './editedIds'
import err from './err'
import success from './success'
import confirm from './confirm'
import oss from './oss'
import { reducer as formReducer } from 'redux-form'
// export default combineReducers({user,form:formReducer,sms})
export default combineReducers({oss,confirm,editedIds, user, sms, pages, stat, chgPwdSuccess, cList, form: formReducer, cForm, err, success })

