//是否显示表单
let sample =false

const showForm = (state = sample, action) => {
    if (action.type === 'SHOW_FORM') {
       return true
    }
    if (action.type === 'CLOSE_FORM') {
        return false
     }
    return state;
}
export default showForm;