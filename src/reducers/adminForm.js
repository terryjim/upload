//短信历史记录列表
let sample = 
    {'id':'',
    'loginName':'',
    'realName':'',
    'regDate':''}

const adminForm = (state = sample, action) => {
    if (action.type === 'GET_ADMIN_INFO') {
       return {data:action.data}
    }
    return state;

}
export default adminForm;