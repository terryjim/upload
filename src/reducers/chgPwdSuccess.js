const chgPwdSuccess = (state = 0, action) => {
    if (action.type === 'CHG_PWD_SUCCESS') {
        state = 1
    } else
        state = 0
    return state
}
export default chgPwdSuccess;