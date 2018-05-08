//管理员表单
let sample = 
    {'id':'',
    'loginName':'',
    'realName':'',
    'regDate':''}

const cForm = (state = sample, action) => {
    if (action.type === 'FILL_FORM') {
       return {data:action.data}
    }
    return state;
}
export default cForm;